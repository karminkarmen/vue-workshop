<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="onClickPrevious">Previous page</a>
      <slot /> {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
    </section>

    <div v-show="isLoading" class="spinner"/>
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
  import ProductsListItem from "/src/components/ProductsListItem.vue";

  export default {
//    props: {
//      page: {
//        type: Number,
//        default: 1
//      },
//      isLoading: Boolean,
//      products: {
//        type: Array,
//        default() {
//          return [];
//        }
//      }
//    },
    data: () => {
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
        this.page += 1;
      },
      onClickPrevious() {
        if (this.page > 1) {
          this.page = this.page - 1;
        }
      },
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((products) => this.products = products)
          .catch(() => console.log("Error fetching products, this should never happen :D"))
          .then(() => this.isLoading = false);
      }
    },
    computed: {
      product() {
        return (this.products.length > 0) ? this.products[0] : {};
      },
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
