import Vuex from 'vuex'
import Vue from 'vue'
import { getAllProducts } from '/src/productService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    productsStatus: {}
  },
  getters: {
    products: (state) => state.products,
    productsStatus: (state) => state.productsStatus,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1
  },
  actions: {
    updateProducts ({ commit }, newProducts) {
      commit('updateProducts', newProducts);
      commit("updateProductsStatus", { loading: false });
    },
    fetchProducts ({ dispatch, commit, getters }) {
      commit("updateProductsStatus", { isLoading: true });

      getAllProducts(getters.currentPageNumber)
        .then((products) => dispatch("updateProducts", products))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit("updateProductsStatus", { error: e });
        })
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    updateProductsStatus(state, newStatus) {
      state.productsStatus = newStatus;
    }
  }
});

export default store;