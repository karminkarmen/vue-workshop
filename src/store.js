import Vuex from 'vuex'
import Vue from 'vue'
import { getAllProducts, getProductById, updateProduct } from '/src/productService';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {},
    saveProductStatus: {}
  },
  getters: {
    products: (state) => state.products,
    productsStatus: (state) => state.productsStatus,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    currentProductId: (state, getters, rootState) => +rootState.route.params.productId || 0,
    currentProduct: (state, getters) => getters.products.find((p) => p.id == getters.currentProductId),
    currentProductStatus: (state, getters) => state.currentProductStatus,
    saveProductStatus: (state, getters) => state.saveProductStatus
  },
  actions: {
    updateProducts ({ commit }, newProducts) {
      commit('updateProducts', newProducts);
      commit("updateProductsStatus", { loading: false });
    },
    fetchProducts ({ dispatch, commit, getters }) {
      commit("updateProductsStatus", { isLoading: true });

      return getAllProducts(getters.currentPageNumber)
        .then((products) => dispatch("updateProducts", products))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit("updateProductsStatus", { error: e });
        })
    },
    updateOrAddProduct({ commit }, product) {
      commit("updateOrAddProduct", product);
    },
    fetchCurrentProduct({ dispatch, commit, getters }) {
      commit("updateCurrentProductStatus", { isLoading: true });
      return getProductById(getters.currentProductId)
        .then((p) => {
          dispatch("updateOrAddProduct", p);
          commit("updateCurrentProductStatus", { isLoading: false });
        })
        .catch((e) => commit("updateCurrentProductStatus", { error: e }))
    },
    saveProduct({ dispatch, commit }, product) {
      commit("updateSaveProductStatus", { isLoading: true });
      return updateProduct(product)
        .then((p) => {
          dispatch("updateOrAddProduct", p);
          commit("updateSaveProductStatus", { isLoading: false });
        })
        .catch((e) => commit("updateSaveProductStatus", { error: e }))

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
    },
    updateSaveProductStatus(state, newStatus) {
      state.saveProductStatus = newStatus;
    }
  }
});

export default store;