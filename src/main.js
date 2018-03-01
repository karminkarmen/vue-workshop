import App from '/src/App.vue';

import ProductsList from '/src/components/ProductsList.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{ path: "/", component: ProductsList }
	]
});

new Vue({
	render: h => h(App),
  router
}).$mount('#app');
