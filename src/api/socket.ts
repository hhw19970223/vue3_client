/**
 * https://socket.io/docs/v4/client-options/
 */

import config from '../../config';
import vue_tool from '../utils/vue_tool';
import { gmMitt, gmMittType } from '../api/mitt';
import { io } from "socket.io-client";

gmMitt.on(gmMittType.errMsg, (mess) => {
    vue_tool.showErr(<string>mess);
})

export let webSocket;
let connecting = false;//与服务端连接状态
let connect_num = 0;//连接次数

export function bulidSocket(token?: string) {

    if (connecting == true) {
        console.log("socket已连接无需重新连接");
        return;
    };

    if (webSocket) {
        connect_num = 0;
        webSocket.open(); // 手动重连
        return;
    }


    let url = process.env.NODE_ENV == 'development' ? `ws://${config.testUrl}` : `ws://${config.url}`;
    webSocket = io(url, {
        reconnection: false,
        query: {
            token: localStorage.getItem('token') || ''
        }
        // autoConnect: false,
    });
    
    // 连接成功
    webSocket.on("connect", webSocketOnOpen)
    // 断开连接
    webSocket.on("disconnect", reconnect);
    // 错误
    webSocket.on("error", reconnect)
    // 连接错误
    webSocket.on("connect_error", reconnect);
    // 重连成功
    webSocket.on("reconnect", webSocketOnOpen);
    // 重连尝试错误
    webSocket.on("reconnect_error", reconnect);

    webSocket.on("message", webSocketOnMessage)
}

/** socket重连 */
function reconnect() {
    connecting = false;
    setTimeout(() => {
        if (connect_num < config.reconnect_limit) {
            connect_num++;
            console.error("socket重连" + connect_num + '次');
            webSocket.connect(); // 手动重连
        } else {
            console.error("socket重连失败即将关闭");
            webSocket.close();
        }
    }, config.reconnect_time)
}

/** socket连接成功 */
function webSocketOnOpen() {
    connecting = true;
    console.log("socket连接成功");
    gmMitt.emit(gmMittType.connectSuccess);//通知主界面webSock连接成功
}
// 获取到后台消息的事件，操作数据的代码在onmessage中书写
function webSocketOnMessage(data) {
    // res就是后台实时传过来的数据
    if (data) {
        try {
            data = JSON.parse(data);
            for (let key in data) {
                gmMitt.emit(key, data[key]);
            }
        } catch (e) {
            console.log(e);
            console.log(data);
        }
    }
}

/** 发送请求 */
export function webSocketSend(params, cb?: (response: any) => void) {
    if (!params) return;
    if (!webSocket) return;
    if (!connecting) {
        vue_tool.showErr("webSocket已断开");
        return;
    }
    if (typeof params != "object") {
        webSocket.emit("message", JSON.stringify({ msg: params }), cb);
    } else {
        webSocket.emit("message", JSON.stringify(params), cb);
    }
}

//模块请求
export function wsReq(module: string, method: string, args: any, cb?: (response: any) => void) {
    let params = {
        module,
        method,
        args
    }
    webSocketSend(params, cb);
}




