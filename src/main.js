import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from './App.vue'
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.filter(
  "asCurrency",
  (price) => '$' + (+price).toFixed(2)
);

Vue.directive(
  "style-when-broken", function (el) {
    el.classList.remove("broken-image");
    if (!el.onerror) {
      el.onerror = () => {
        el.classList.add("broken-image");
      };
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
      path: '/product/:id',
      component: ProductDetails,
      props: idAsNumber
    },
    {
      path: '/product/:id/edit',
      component: ProductForm,
      props: idAsNumber
    }
  ]
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
