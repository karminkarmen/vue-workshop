<template>
  <div>
    <p>
      <a class="btn" href="#less" @click.prevent="onClickPrevious">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
    </p>

    <loading-status :is-loading="isLoading">
      <ul class="product-list">
        <products-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </ul>
    </loading-status>
  </div>
</template>

<script>
  import {getAllProducts} from '../productService';
  import LoadingStatus from "./LoadingStatus";
  import ProductsListItem from "./ProductsListItem";

  export default {
    data() {
      return {
        page: 1,
        products: [],
        isLoading: true
      }
    },
    created() {
      this.reloadProducts();
    },
    methods: {
      onClickNext() {
        this.page = this.page + 1;
      },
      onClickPrevious() {
        if (this.page > 1) {
          this.page = this.page - 1;
        }
      },
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch((e) => this.products = [])
          .then(() => this.isLoading = false);
      }
    },
    watch: {
      page() {
        this.reloadProducts();
      }
    },
    components: {
      ProductsListItem,
      LoadingStatus
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/commons";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;

    &--product {
      $inRow: 4;
      flex-basis: calc(#{100%/$inRow} - #{$gutter});
    }
  }
</style>
