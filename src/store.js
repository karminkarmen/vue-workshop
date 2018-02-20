import Vuex from 'vuex'
import Vue from 'vue'
import { getAllProducts, getProductById, updateProduct } from '/src/productService';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {}
  },
  getters: {
    products: (state) => state.products,
    productsStatus: (state) => state.productsStatus,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    currentProductId: (state, getters, rootState) => +rootState.route.params.productId || 0,
    currentProduct: (state, getters) => getters.products.find((p) => p.id == getters.currentProductId),
    currentProductStatus: (state, getters) => state.currentProductStatus
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
    },
    updateOrAddProduct({ commit }, product) {
      commit("updateOrAddProduct", product);
      commit("updateCurrentProductStatus", { isLoading: false });
    },
    fetchCurrentProduct({ dispatch, commit, getters }) {
      commit("updateCurrentProductStatus", { isLoading: true });
      getProductById(getters.currentProductId)
        .then((p) => dispatch("updateOrAddProduct", p))
        .catch(() => commit("updateCurrentProductStatus", { error: true }))
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    updateProductsStatus(state, newStatus) {
      state.productsStatus = newStatus;
    },
    updateOrAddProduct(state, newOrUpdatedProduct) {
      const productIdx = state.products.findIndex((p) => p.id == s.currentProductId)
      if (productIdx > -1) {
        state.products.splice(productIdx, 1, newOrUpdatedProduct)
      } else {
        state.products.push(newOrUpdatedProduct);
      }
    },
    updateCurrentProductStatus(state, newStatus) {
      state.currentProductStatus = newStatus;
    }
  }
});

export default store;