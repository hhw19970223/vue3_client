import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus';//UI库组件
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'default-passive-events'//由于 Chrome 想提高浏览器动画渲染帧数，要修改 eventListener 相关接口，出现了遮罩层无法屏蔽滚动动作的情况。
import md5 from 'blueimp-md5';//md5加密
export const app = createApp(App);
app.config.globalProperties.$filters = {
    encryption(value: string) {
        return md5(value);
    }
}

import router from './router';
import store from './store';
import loadSelect from './components/load-select.vue';

app.use(ElementPlus, { locale })// 将自动设置 Day.js 的国际化设置为 'zh-cn'
.use(router)
.use(store)
.component('hhw-load-select', loadSelect)
.mount('#app')