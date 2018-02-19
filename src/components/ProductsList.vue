<template>
  <div>
    <section class="container">
      <router-link class="btn" :to="{ path: '/', query: {page: page - 1}}" v-if="!isFirstPage">Previous page</router-link>
      {{ page }}
      <router-link class="btn" :to="{ path: '/', query: {page: page + 1}}" v-if="!noProducts">Next page</router-link>
    </section>

    <div v-show="productsStatus.isLoading" class="spinner"/>
    <section v-show="!productsStatus.isLoading" class="container">
      <div class="box" v-if="productsStatus.error">
        No products. Try a different page.
      </div>
      <ul v-else class="product-list">
        <products-list-item
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
      </ul>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ProductsListItem from "/src/components/ProductsListItem.vue";

  export default {
    data: () => {
      return {
        isLoading: true
      }
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      ...mapActions([
        "fetchProducts"
      ]),
    },
    computed: {
      ...mapGetters([
        "products",
        "productsStatus"
      ]),
      ...mapGetters({
        page: "currentPageNumber"
      }),
      isFirstPage() {
        return this.page === 1;
      },
      noProducts() {
        return this.products.length === 0;
      }
    },
    watch: {
      page() {
        this.fetchProducts();
      }
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }
</style>
