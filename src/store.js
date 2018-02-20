import {UPDATE_PRODUCT_STATUS} from '/src/mutationKeys';
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
      commit(UPDATE_PRODUCT_STATUS, { isLoading: false });
    },
    fetchProducts({ getters, commit, dispatch }, pageNumber) {
      commit(UPDATE_PRODUCT_STATUS, { isLoading: true });
      getAllProducts(pageNumber || getters.currentPageNumber)
        .then((products) => dispatch("updateProducts", products))
        .catch(() => {
          dispatch("updateProducts", []);
          commit(UPDATE_PRODUCT_STATUS, { isError: true })
        });
    }
  },
  mutations: {
    [UPDATE_PRODUCT_STATUS](state, newStatus) {
      state.productsStatus = newStatus;
    },
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});