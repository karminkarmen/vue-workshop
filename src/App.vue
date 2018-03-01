<template>
  <div id="app">

    <navbar />

    <products-list
      v-bind="{ products, isLoading, page }"
      @nextPage="nextPage"
      @previousPage="previousPage"
    />

    <product-details :product="product" />

    <div class="container">

      <form action="#" class="box product-edit">
        <h2>Edit product X</h2>

        <div class="form-row">
          <label for="edit-name">Name</label>
          <input id="edit-name" v-model.trim="product.name" type="text" />
        </div>

        <div class="form-row">
          <label for="edit-photo">Photo</label>
          <input id="edit-photo" v-model.trim.lazy="product.photo" type="text" />
          <img class="photo-preview" v-style-when-broken :src="product.photo" />
        </div>

        <div class="form-row">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc" v-model="product.description"></textarea>
        </div>

        <div class="form-row">
          <label for="edit-color">Color</label>
          <input type="color" v-model.trim="product.color" id="edit-color" />
        </div>

        <div class="form-row">
          <label>Materials</label>
          <div>
            <label><input type="checkbox" value="Steel" v-model="product.materials"/> Steel</label>

          </div>
        </div>

        <div class="form-row">
          <label for="edit-departmnet">Department</label>
          <select id="edit-departmnet" v-model="product.department">
            <option>Books</option>
            <option>Movies</option>
            <option>Music</option>
            <option>Games</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Home</option>
            <option>Garden</option>
            <option>Tools</option>
            <option>Grocery</option>
            <option>Health</option>
            <option>Beauty</option>
            <option>Toys</option>
            <option>Kids</option>
            <option>Baby</option>
            <option>Clothing</option>
            <option>Shoes</option>
            <option>Jewelery</option>
            <option>Sports</option>
            <option>Outdoors</option>
            <option>Automotive</option>
            <option>Industrial</option>
          </select>
        </div>

        <div class="form-row">
          <label for="edit-stock">In stock</label>
          <input type="number" v-model="product.inStock" id="edit-stock" />
        </div>

        <div class="form-row">
          <label for="edit-price">Price</label>
          <input type="number" v-model.number="product.price" id="edit-price" />
        </div>

        <button class="btn">Save product</button>
      </form>
    </div>

    <div class="container">
      <div class="box">
        <div class="spinner"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getAllProducts } from '/src/productService';
  import commonFilters from '/src/filters';
  import { styleWhenBroken } from '/src/directvies';
  import Navbar from '/src/components/Navbar.vue';
  import ProductDetails from '/src/components/ProdictDetails.vue';
  import ProductsList from '/src/components/ProductsList.vue';

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
      ProductsList
    }
	}
</script>

<style lang="scss">
  @import './assets/style';

</style>
