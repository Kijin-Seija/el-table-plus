import Vue from 'vue'
import App from './examples/app.vue'
import ElementUI from 'dh-element-ui'
import 'dh-element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

new Vue(App).$mount('#app')