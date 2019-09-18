import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import CommonTable from '../CommonTable'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.component('CommonTable', CommonTable)

new Vue(App).$mount('#app')