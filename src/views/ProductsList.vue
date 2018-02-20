<template>
  <div>
    <section class="container">
      <router-link class="btn" v-if="hasPrevious" :to="{ name: 'productsList', query: { page: page - 1 }}">Previous page</router-link>
      {{ page }}
      <router-link class="btn" v-if="hasNext" :to="{ name: 'productsList', query: { page: page + 1 }}">Next page</router-link>
    </section>

    <section class="container">
      <div v-if="isLoading" class="spinner" />
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
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from "/src/components/ProductsListItem";

  export default {
    props: {
      page: Number
    },
    data() {
      return {
        name: "Vue.js (work)shop",
        isLoading: true
      }
    },
    computed: {
      ...mapGetters([
        "products"
      ]),
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
        "updateProducts"
      ]),
      fetchProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((products) => this.updateProducts(products))
          .catch(() => this.updateProducts([]))
          .then(() => this.isLoading = false);
      }
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
