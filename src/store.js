import {UPDATE_PRODUCT_STATUS} from '/src/mutationKeys';
import {getAllProducts, getProductById} from '/src/productService';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const productById = (idToFind) => ((p) => (p.id === idToFind));

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {}
  },
  getters: {
    products: (state) => state.products,
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    currentProductId: (state, getters, rootState) => +rootState.route.params.id,
    productsStatus: (state) => state.productsStatus,
    currentProduct: (s, g) => g.products.find(productById(g.currentProductId))
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
    },
    fetchCurrentProduct({ commit, getters }) {
      commit("updateCurrentProductStatus", { isLoading: true });
      if (getters.currentProductId >= 0) {
        getProductById(getters.currentProductId)
          .then((p) => {
            commit("addOrUpdateProduct", p);
            commit("updateCurrentProductStatus", { isLoading: false });
          })
          // .catch((e) => commit("updateCurrentProductStatus", { isError: true }))
      } else {
        commit("updateCurrentProductStatus", { isError: true });
      }
    }
  },
  mutations: {
    addOrUpdateProduct(state, product) {
      const idx = state.products.findIndex(productById(product.id));
      if (idx > -1) {
        state.products.splice(idx, 1, product);
        // state.products[idx] = product; // nie zadziala, bo reaktywnosc nie jest idealna
      } else {
        state.products.push(product);
      }
    },
    updateCurrentProductStatus(state, newStatus) {
      state.currentProductStatus = newStatus;
    },
    [UPDATE_PRODUCT_STATUS](state, newStatus) {
      state.productsStatus = newStatus;
    },
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});