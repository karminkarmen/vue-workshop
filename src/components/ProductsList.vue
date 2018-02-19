<template>
  <div>
    <section class="container">
      <router-link class="btn" :to="{ path: '/', query: {page: page - 1}}" v-if="!isFirstPage">Previous page</router-link>
      {{ page }}
      <router-link class="btn" :to="{ path: '/', query: {page: page + 1}}" v-if="!noProducts">Next page</router-link>
    </section>

    <div v-show="isLoading" class="spinner"/>
    <section v-show="!isLoading" class="container">
      <div v-if="noProducts">
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
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from "/src/components/ProductsListItem.vue";

  export default {
    data: () => {
      return {
        isLoading: true
      }
    },
    created() {
      this.reloadProducts();
    },
    methods: {
      ...mapActions(["updateProducts"]),
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((products) => this.updateProducts(products))
          .catch(() => this.updateProducts([]))
          .then(() => this.isLoading = false);
      }
    },
    computed: {
      ...mapGetters([
        "products"
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
        this.reloadProducts();
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
