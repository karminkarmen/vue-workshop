<template>
  <div id="app">

    <navbar />

    <ProductsList
      :products="products"
      :isLoading="isLoading"
      :page="page"
      @previousPage="onClickPrevious"
      @nextPage="onClickNext"
    />

    <product-details :product="product" />

    <product-form :product="product" />

  </div>
</template>

<script>
  import { getAllProducts } from '/src/productService';
  import Navbar from '/src/components/Navbar.vue';
  import ProductDetails from '/src/components/ProductDetails.vue';
  import ProductsList from '/src/components/ProductsList.vue';
  import ProductForm from '/src/components/ProductForm.vue';

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
      Navbar,
      ProductDetails,
      ProductsList,
      ProductForm
    }
	}
</script>

<style lang="scss">
  @import "./assets/style";

</style>
