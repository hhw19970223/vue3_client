import axios from 'axios';
import vue_tool from '../utils/vue_tool';
import config from '../../config'
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? `//${config.testUrl}` : `//${config.url}`;
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['token'] = localStorage.getItem('token') || '';//localStorage.setItem(name, value)
axios.defaults.headers.post['Content-Type'] = 'application/json';

//请求前拦截器
axios.interceptors.request.use(args => {
    // 在发送请求之前做些什么
    return args;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//收到相应拦截器
axios.interceptors.response.use(res => {
    if (typeof res !== 'object') {
        vue_tool.showErr('服务端返回数据异常');
        return Promise.reject(res)
    }
    if (res.data.err) {
        vue_tool.showErr(res.data.err)
        return Promise.reject(res.data.err);
    }
    return res.data.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


function request(route: string, args: any, isPost: boolean, cb: (res) => void) {
    let routeList = route.split(".");
    let params = {
        routeName: routeList[0],
        moduleName: routeList[1],
        method: routeList[2],
        args
    };

    if (isPost) {
        axios.post('/' + params.routeName, params).then(function (res) {
            cb(res);
        }, function (err) {
            console.error(err);
        });
    }
    else {
        axios.get('/' + params.routeName, { params }).then(function (res) {
            cb(res);
        }, function (err) {
            console.error(err);
        });
    }
}

export function gmPost(route: string, args: any, cb: () => void) {
    request(route, args, true, cb)
}

export function gmGet(route: string, args: any, cb: () => void) {
    request(route, args, false, cb)
}