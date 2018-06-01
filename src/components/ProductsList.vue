<template>
  <div>
    <p v-show="!productsStatus.loading && !(isFirstPage && isLastPage)">
      <router-link :to="{ path: '/', query: { page: page - 1 } }" v-show="!isFirstPage" class="btn">Previous page</router-link>
      {{ page }}
      <router-link :to="{ path: '/', query: { page: page + 1 } }" v-show="!isLastPage" class="btn">Next page</router-link>
    </p>
    <loading-status :is-loading="productsStatus.loading" :is-error="productsStatus.error">
      <ul v-if="products.length" class="product-list">
        <products-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </ul>
      <p v-else>No products to be shown. Try a different page.</p>
    </loading-status>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import LoadingStatus from "./LoadingStatus";
  import ProductsListItem from "./ProductsListItem";

  export default {
    mounted() {
      this.fetchProducts();
    },
    computed: {
      isFirstPage() {
        return this.page === 1;
      },
      isLastPage() {
        return this.products.length === 0;
      },
      ...mapGetters({
        page: "currentPageNumber"
      }),
      ...mapGetters([
        "products",
        "productsStatus"
      ])
    },
    methods: {
      ...mapActions(["fetchProducts"])
    },
    watch: {
      page() {
        this.fetchProducts();
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
