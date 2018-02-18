<template>
  <div id="app">

    <navbar class="container" />

    <products-list
      :products="products"
      :page="page"
      :isLoading="isLoading"
      @previous="onClickPrevious"
      @next="onClickNext"
    >
      strona
    </products-list>

    <product-details :product="product" />

    <product-form :product="product" />

  </div>
</template>

<script>
  import { getAllProducts } from '/src/productService';
  import Navbar from '/src/components/Navbar.vue';
  import ProductsList from '/src/components/ProductsList.vue';
  import ProductDetails from '/src/components/ProductDetails.vue';
  import ProductForm from '/src/components/ProductForm.vue';

	export default {
		data: () => {
		  return {
		    name: "Vue.js",
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
      Navbar,
      ProductsList,
      ProductDetails,
      ProductForm
    }
	}
</script>

<style lang="scss">
  @import "./assets/style";
</style>
