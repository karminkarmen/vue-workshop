<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="onClickPrevious">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
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
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from "/src/components/ProductsListItem";

  export default {
    data() {
      return {
        name: "Vue.js (work)shop",
        page: 1,
        isLoading: true,
        products: []
      }
    },
    computed: {
      product() {
        return (this.products.length > 0) ? this.products[0] : {};
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
      fetchProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((products) => this.products = products)
          .catch(() => this.products = [])
          .then(() => this.isLoading = false);
      },
      onClickPrevious() {
        if (this.page > 1) {
          this.page -= 1;
        }
      },
      onClickNext() {
        this.page += 1;
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
