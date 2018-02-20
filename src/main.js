import Vue from 'vue'
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from '/src/store';
import App from '/src/App.vue'
import ProductsList from '/src/components/ProductsList.vue';
import ProductDetails from '/src/components/ProductDetails.vue';
import ProductForm from '/src/components/ProductForm.vue';

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.filter(
	"asCurrency",
	(price) => '$' + (+price).toFixed(2)
);

Vue.directive(
	"style-when-broken", function(el) {
		el.classList.remove("broken-image");
		if (!el.onerror) {
			el.onerror = () => {
				el.classList.add("broken-image");
			}
		}
	}
);

const idAsNumber = (r) => ({ id: +r.params.id });
const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: ProductsList
		},
		{
			path: '/product/:productId',
			component: ProductDetails
		},
		{
			path: '/product/:productId/edit',
			component: ProductForm,
			props: idAsNumber
		}
	]
});

sync(store, router);

new Vue({
	render: h => h(App),
	router,
  store
}).$mount('#app');
