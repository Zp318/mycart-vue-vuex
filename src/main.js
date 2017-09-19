// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Address from './Address.vue'
import Pay from './Pay.vue'
import store from '../vuex/store'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  	routes:[
	  { path: '/address', component: Address },
	  { path: '/pay', component: Pay }
	]
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
