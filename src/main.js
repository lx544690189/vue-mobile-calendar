import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import Calendar from '../lib/install';

Vue.config.productionTip = false;
Vue.use(Calendar);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
