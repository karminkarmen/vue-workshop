import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    products: (state) => state.products,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1
  },
  actions: {
    updateProducts({ commit }, newProducts) {
      commit("updateProducts", newProducts);
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});