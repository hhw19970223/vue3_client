import config from '../../config';
import vue_tool from '../utils/vue_tool';
import { gmMitt, gmMittType } from '../api/mitt';
import ReconnectingWebSocket from 'reconnecting-websocket';

export let socket;

export let webSocket;
let connecting = false;//与服务端连接状态


export function bulidSocket() {
    let url = process.env.NODE_ENV == 'development' ? `ws://${config.testUrl}` : `ws://${config.url}`;

    // webSocket = new WebSocket(url);
    webSocket = new ReconnectingWebSocket(url);
    webSocket.onopen = webSocketOnOpen;
    webSocket.onclose = webSocketOnClose;
    webSocket.onmessage = webSocketOnMessage;
    webSocket.onerror = webSocketOnError;
}

// 建立连接成功后的状态
function webSocketOnOpen() {
    connecting = true;
    gmMitt.emit(gmMittType.connectSuccess);//通知主界面webSock连接成功
}
// 获取到后台消息的事件，操作数据的代码在onmessage中书写
function webSocketOnMessage(res) {
    // res就是后台实时传过来的数据
    if (res && res.data) {
        try {
            let data = JSON.parse(res.data);
            for (let key in data) {
                gmMitt.emit(key, data[key]);
            }
        } catch (e) {
            console.log(e);
            console.log(res.data);
        }
    }
}
// 关闭连接
function webSocketOnClose() {
    connecting = false;
    if (webSocket) webSocket.close();
}
//连接失败的事件
function webSocketOnError(res) {
    console.log('websocket连接失败');
    console.log(res);
}

export function webSocketSend(params) {
    if (!params) return;
    if (!webSocket) return;
    if (!connecting) {
        vue_tool.showErr("webSocket已断开");
        return;
    }
    if (typeof params != "object") {
        webSocket.send(JSON.stringify({ msg: params }));
    } else {
        webSocket.send(JSON.stringify(params));
    }
}

//模块请求
export function wsReq(module: string, method: string, args: any) {
    let params = {
        module,
        method,
        args
    }
    webSocketSend(params);
}




