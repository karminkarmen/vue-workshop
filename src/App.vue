<template>
  <div id="app">

    <navbar />

    <products-list
      v-bind="{ products, isLoading, page }"
      @nextPage="nextPage"
      @previousPage="previousPage"
    />

    <product-details :product="product" />

    <product-form :product="product" />
  </div>
</template>

<script>
  import { getAllProducts } from '/src/productService';
  import commonFilters from '/src/filters';
  import { styleWhenBroken } from '/src/directvies';
  import Navbar from '/src/components/Navbar.vue';
  import ProductDetails from '/src/components/ProdictDetails.vue';
  import ProductsList from '/src/components/ProductsList.vue';
  import ProductForm from '/src/components/ProductForm.vue';

	export default {
		data() {
		  return {
        page: 1,
        isLoading: true,
        products: []
      };
    },
    computed: {
		  product() {
		    return (this.products.length > 0) ? this.products[0] : {};
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
    filters: {
      ...commonFilters
    },
    directives: {
      styleWhenBroken
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
  @import './assets/style';

</style>
