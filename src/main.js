import Vue from 'vue'
import App from './App.vue'
import fileViewRegister from './components/fileViewRegister'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$fileView = fileViewRegister;

new Vue({
    render: h => h(App),
}).$mount('#app');
