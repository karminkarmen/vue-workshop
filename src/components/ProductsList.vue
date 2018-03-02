<template>

  <div>
    <section class="container">
      <router-link class="btn" :to="previousPageHref" v-show="hasPreviousPage">Previous page</router-link>
      {{ page }}
      <router-link class="btn" :to="nextPageHref" v-show="hasNextPage">Next page</router-link>
    </section>

    <loading-header v-bind="{ isLoading, isError }">
      <section class="container">
        <ul class="product-list">
          <products-list-item
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
        </ul>
      </section>
    </loading-header>
  </div>

</template>

<script>
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from '/src/components/ProductsListItem.vue';
  import LoadingHeader from '/src/components/LoadingHeader.vue';

  export default {
    props: {
      page: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        isLoading: true,
        isError: true,
        products: []
      };
    },
    computed: {
      nextPageHref() {
        return { name:'productsList', query: { page: this.page + 1 } };
      },
      previousPageHref() {
        return { name:'productsList', query: { page: this.page - 1 } };
      },
      hasNextPage() {
        return this.products.length > 0;
      },
      hasPreviousPage() {
        return this.page > 1;
      },
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
      fetchProducts() {
        this.isLoading = true;
        this.isError = false;

        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch((e) => {
            this.isError = true;
            this.products = [];
          })
          .then(() => this.isLoading = false);
      }
    },
    components: {
      ProductsListItem,
      LoadingHeader
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
