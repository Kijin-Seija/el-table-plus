import Vue from 'vue'
import App from './examples/app.vue'
import ElementUI from 'dh-element-ui'
import CommonTable from './CommonTable'
import 'dh-element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.component('CommonTable', CommonTable)

new Vue(App).$mount('#app')