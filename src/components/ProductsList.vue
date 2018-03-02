<template>

  <div>
    <section class="container">
      <router-link class="btn" :to="previousPageHref" v-show="hasPreviousPage">Previous page</router-link>
      {{ page }}
      <router-link class="btn" :to="nextPageHref" v-show="hasNextPage">Next page</router-link>
    </section>

    <loading-header v-bind="productsStatus">
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
  import { mapGetters, mapActions } from 'vuex';
  import { getAllProducts } from '/src/productService';
  import ProductsListItem from '/src/components/ProductsListItem.vue';
  import LoadingHeader from '/src/components/LoadingHeader.vue';

  export default {
    computed: {
      ...mapGetters(["products", "productsStatus"]),
      ...mapGetters({
        page: "currentPageNumber",
      }),
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
      }
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
      ...mapActions([
        "fetchProducts"
      ])
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
