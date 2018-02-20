import Vue from 'vue'
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import App from '/src/App.vue'
import ProductsList from '/src/views/ProductsList.vue';

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.config.productionTip = false

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

const router = new VueRouter({
	mode: "history",
	routes: [
		{ path: '/', component: ProductsList }
	]
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
