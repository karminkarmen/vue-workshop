<template>
  <form action="#" class="box product-edit">
    <div class="spinner" v-if="isLoading" />
    <template v-else-if="isError">
      <span class="lozenge">Error</span>
      There was an error when fetching the product.
    </template>
    <template v-else>
      <h2>Edit product X</h2>

      <div class="form-row">
        <label for="edit-name">Name</label>
        <input id="edit-name" v-model="name" @input="$v.name.$touch()" type="text" />
      </div>

      <div class="form-row">
        <label for="edit-photo">Photo</label>
        <input id="edit-photo" v-model.lazy="photo" @change="$v.photo.$touch()" type="text" />
        <img class="photo-preview" :src="photo" v-style-when-broken />
      </div>

      <div class="form-row">
        <label for="edit-desc">Description</label>
        <textarea v-model="description" @input="$v.description.$touch()" id="edit-desc"></textarea>
      </div>

      <div class="form-row">
        <label for="edit-color">Color</label>
        <input type="color" v-model.trim="color" @input="$v.color.$touch()" id="edit-color" />
      </div>

      <div class="form-row">
        <label>Materials</label>
        <div>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Steel"/> Steel</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Wooden"/> Wooden</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Concrete"/> Concrete</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Plastic"/> Plastic</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Cotton"/> Cotton</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Granite"/> Granite</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Rubber"/> Rubber</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Metal"/> Metal</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Soft"/> Soft</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Fresh"/> Fresh</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Frozen"/> Frozen</label>
        </div>
      </div>

      <div class="form-row">
        <label for="edit-departmnet">Department</label>
        <select v-model="department" @input="$v.department.$touch()" id="edit-departmnet">
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
        <input type="number" v-model.number="inStock" @input="$v.inStock.$touch()" id="edit-stock" />
      </div>

      <div class="form-row">
        <label for="edit-price">Price</label>
        <input type="number" v-model.number="price" @input="$v.price.$touch()" id="edit-price" />
      </div>

      <button :disabled="$v.$invalid" class="btn">Save product</button>
      <span class="lozenge" v-if="$v.$invalid">ERRORS</span>
    </template>
  </form>
</template>

<script>
  import {required, numeric} from 'vuelidate/lib/validators';
  import { getProductById } from '/src/productService';

  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isLoading: true,
        isError: false,

        name: "",
        description: "",
        photo: "",
        color: "#ffffff",
        materials: [],
        department: "",
        inStock: 0,
        price: 0,
      }
    },
    created() {
      this.fetchProduct();
    },
    watch: {
      id() {
        this.fetchProduct();
      }
    },
    methods: {
      fetchProduct() {
        this.isLoading = true;
        this.isError = false;
        getProductById(this.id)
          .then((product) => {
            this.name = product.name || "";
            this.description = product.description || "";
            this.photo = product.photo || "";
            this.color = product.color || "#ffffff";
            this.materials = product.materials || [];
            this.department = product.department || "";
            this.inStock = product.inStock || 0;
            this.price = product.price || 0;
          })
          .catch(() => this.isError = true)
          .then(() => this.isLoading = false);
      }
    },
    validations: {
      name: {required},
      description: {required},
      photo: {required},
      color: {required},
      materials: {required},
      department: {required},
      inStock: {required, numeric},
      price: {required, numeric}
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";
</style>
