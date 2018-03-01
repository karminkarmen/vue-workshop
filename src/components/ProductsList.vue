<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="previousPage">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="nextPage">Next page</a>
    </section>

    <div v-show="isLoading" class="spinner"></div>
    <section v-show="!isLoading" class="container">
      <ul class="product-list">
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
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from '/src/components/ProductsListItem.vue';

  export default {
    data() {
      return {
        page: 1,
        isLoading: true,
        products: []
      };
    },
    watch: {
      page() {
        this.fetchProducts();
      }
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      nextPage() {
        this.page += 1;
      },
      previousPage() {
        if (this.page > 1) {
          this.page -= 1;
        }
      },
      fetchProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch((e) => console.error(e))
          .then(() => this.isLoading = false);

      }
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import '../assets/style';

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }

</style>
