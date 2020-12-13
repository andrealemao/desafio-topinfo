import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BAlert } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.component('b-alert', BAlert)

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
