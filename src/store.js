import {getAllProducts} from "/src/productService";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const UPDATE_PRODUCTS = "updateProducts";
const UPDATE_PRODUCTS_STATUS = "updateProductsStatus";

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
      commit(UPDATE_PRODUCTS, newProducts);
      commit(UPDATE_PRODUCTS_STATUS, { isLoading: false });
    },
    fetchProducts({ commit, dispatch, getters }) {
      commit(UPDATE_PRODUCTS_STATUS, { isLoading: true });

      getAllProducts(getters.currentPageNumber)
        .then((data) => dispatch("updateProducts", data))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit(UPDATE_PRODUCTS_STATUS, { isError: true });
          console.error(e);
        });
    }
  },
  mutations: {
    [UPDATE_PRODUCTS](state, newProducts) {
      state.products = newProducts;
    },
    [UPDATE_PRODUCTS_STATUS](state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
    }
  }

});