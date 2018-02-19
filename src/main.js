import Vue from 'vue'
import App from './App.vue'

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

new Vue({
	render: h => h(App)
}).$mount('#app')
