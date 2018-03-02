import {getAllProducts, getProductById} from "/src/productService";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const UPDATE_PRODUCTS = "updateProducts";
const UPDATE_PRODUCTS_STATUS = "updateProductsStatus";
const UPDATE_CURRENT_PRODUCT_STATUS = "updateCurrentProductStatus";
const UPDATE_OR_ADD_PRODUCT = "updateOrAddProduct";

const idAsNumber = (r) => {
  const idAsNumber = +r.params.id;
  if (isNaN(idAsNumber)) {
    return -1;
  }

  return idAsNumber;
};

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {}
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    currentProductId: (state, getters, rootState) => idAsNumber(rootState.route),
    products: (state, getters) => state.products,
    productsStatus: (state) => state.productsStatus,
    currentProduct: (state, getters) => getters.products.find((p) => p.id == getters.currentProductId) || {},
    currentProductStatus: (state) => state.currentProductStatus,
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
    },
    fetchCurrentProduct({ getters, commit, dispatch } ) {
      commit(UPDATE_CURRENT_PRODUCT_STATUS, { isLoading: true });

      if (getters.currentProductId >= 0) {
        getProductById(getters.currentProductId)
          .then((p) => {
            commit(UPDATE_OR_ADD_PRODUCT, p);
            commit(UPDATE_CURRENT_PRODUCT_STATUS, { isLoading: false });
          })
          .catch((e) => {
            commit(UPDATE_CURRENT_PRODUCT_STATUS, { isError: true });
          })
      } else {
        this.product = {};
        commit(UPDATE_CURRENT_PRODUCT_STATUS, { isError: true });
      }
    }
  },
  mutations: {
    [UPDATE_PRODUCTS](state, newProducts) {
      state.products = newProducts;
    },
    [UPDATE_PRODUCTS_STATUS](state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
    },
    [UPDATE_CURRENT_PRODUCT_STATUS](state, newStatus) {
      state.currentProductStatus = newStatus;
    },
    [UPDATE_OR_ADD_PRODUCT](state, updatedProduct) {
      const productIdx = state.products.findIndex((p) => p.id == updatedProduct.id);
      if (productIdx < 0) {
        state.products.push(updatedProduct);
      } else {
        // state.products[productIdx] = updatedProduct; tak się nie da
        state.products.splice(productIdx, 1, updatedProduct);
      }
    }
  }

});