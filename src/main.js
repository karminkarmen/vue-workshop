import App from '/src/App.vue'
import store from '/src/store';
import NotFound from '/src/views/NotFound.vue';
import ProductDetails from '/src/views/ProductDetails.vue';
import ProductForm from '/src/views/ProductForm.vue';
import ProductsList from '/src/views/ProductsList.vue';
import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import {sync} from 'vuex-router-sync';

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.filter("asCurrency", (price) => '$' + (+price).toFixed(2));

Vue.directive("style-when-broken", (el) => {
	if (el.oldSrc != el.src) {
		el.oldSrc = el.src;
		el.classList.remove("broken-image");
	}
	if (!el.onerror) {
		el.onerror = () => {
      el.classList.add("broken-image");
		}
	}
});

const idAsProp = (r) => ({ id: +r.params.id });

const router = new VueRouter({
	routes: [
		{ name: "productsList", path: '/', component: ProductsList},
		{ name: "productDetails", path: '/product/:id', component: ProductDetails},
		{ path: '/product/:id/edit', component: ProductForm, props: idAsProp },
		{ name: "NotFound", path: '/404', component: NotFound},
		{ path: '*', component: NotFound}
	]
});

window.loggedIn = true;

router.beforeEach((to, from, next) => {
	if (window.loggedIn === true || to.name === "productsList" ) {
		next();
	} else {
		next({name: "productsList"})
	}
});

sync(store, router);
new Vue({
	render: h => h(App),
	router,
  store
}).$mount('#app');
