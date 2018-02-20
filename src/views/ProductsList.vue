<template>
  <div>
    <section class="container">
      <router-link class="btn" v-if="hasPrevious" :to="{ name: 'productsList', query: { page: page - 1 }}">Previous page</router-link>
      {{ page }}
      <router-link class="btn" v-if="hasNext" :to="{ name: 'productsList', query: { page: page + 1 }}">Next page</router-link>
    </section>

    <section class="container">
      <div v-if="productsStatus.isLoading" class="spinner" />
      <ul v-else class="product-list">
        <products-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </ul>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ProductsListItem from "/src/components/ProductsListItem";

  export default {
    computed: {
      computedProducts: {
        ...mapGetters({
          get: "products"
        }),
        ...mapActions({
          set: "updateProducts"
        }),
      },
      ...mapGetters([
        "products",
        "productsStatus"
      ]),
      ...mapGetters({
        page: "currentPageNumber"
      }),
      hasPrevious() {
        return this.page > 1
      },
      hasNext() {
        return this.products.length > 0;
      }
    },
    created() {
      this.fetchProducts();
    },
    watch: {
      page() {
        this.fetchProducts();
      }
    },
    methods: {
      ...mapActions([
        "updateProducts",
        "fetchProducts"
      ]),
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }

</style>
