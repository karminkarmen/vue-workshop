import {getAllProducts} from '/src/productService';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {}
  },
  getters: {
    products: (state) => state.products,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    productsStatus: (state) => state.productsStatus
  },
  actions: {
    updateProducts({ commit }, newProducts) {
      commit("updateProducts", newProducts);
      commit("updateProductsStatus", { isLoading: false });
    },
    fetchProducts({ getters, commit, dispatch }, pageNumber) {
      commit("updateProductsStatus", { isLoading: true });
      getAllProducts(pageNumber || getters.currentPageNumber)
        .then((products) => dispatch("updateProducts", products))
        .catch(() => {
          dispatch("updateProducts", []);
          commit("updateProductsStatus", { isError: true })
        });
    }
  },
  mutations: {
    updateProductsStatus(state, newStatus) {
      state.productsStatus = newStatus;
    },
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});