import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    products: (state) => state.products,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1
  },
  actions: {
    updateProducts ({ commit }, newProducts) {
      commit('updateProducts', newProducts);
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});

export default store;