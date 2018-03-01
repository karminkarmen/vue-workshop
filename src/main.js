import App from '/src/App.vue';
import Vue from 'vue';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
	render: h => h(App)
}).$mount('#app');
