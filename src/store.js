import {getAllProducts} from "/src/productService";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {}
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    products: (state, getters) => state.products,
    productsStatus: (state) => state.productsStatus
  },
  actions: {
    updateProducts({ commit }, newProducts) {
      commit("updateProducts", newProducts);
      commit("updateProductsStatus", { isLoading: false });
    },
    fetchProducts({ commit, dispatch, getters }) {
      commit("updateProductsStatus", { isLoading: true });

      getAllProducts(getters.currentPageNumber)
        .then((data) => dispatch("updateProducts", data))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit("updateProductsStatus", { isError: true });
          console.error(e);
        });
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    updateProductsStatus(state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
    }
  }

});