import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import basecss from './assets/todo.css'

Vue.config.productionTip = false

new Vue({
  basecss,
  render: h => h(App),
}).$mount('#app')
