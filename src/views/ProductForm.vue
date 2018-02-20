<template>
  <loading-state v-bind="{ isLoading, isError }">
    <form @submit.prevent="saveProduct" class="box product-edit">
      <h2>Edit product {{ name }}</h2>

      <div class="form-row">
        <label for="edit-name">Name</label>
        <input id="edit-name" v-model.trim="name" @change="$v.name.$touch()" type="text" />
      </div>

      <div class="form-row">
        <label for="edit-photo">Photo</label>
        <input id="edit-photo" v-model.trim.lazy="photo" @change="$v.photo.$touch()" type="text" />
        <img class="photo-preview" :src="photo" v-style-when-broken />
      </div>

      <div class="form-row">
        <label for="edit-desc">Description</label>
        <textarea v-model="description" @change="$v.description.$touch()" id="edit-desc"></textarea>
      </div>

      <div class="form-row">
        <label for="edit-color">Color</label>
        <input type="color" v-model.trim="color" @change="$v.color.$touch()" id="edit-color" />
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
        <select id="edit-departmnet" v-model="department" @change="$v.department.$touch()">
          <option value="" disabled>Select department...</option>
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
        <input type="number" v-model.number="inStock" @change="$v.inStock.$touch()" id="edit-stock" />
      </div>

      <div class="form-row">
        <label for="edit-price">Price</label>
        <input type="text" v-model.number="price" @change="$v.price.$touch()" id="edit-price" />
      </div>

      <button type="submit" class="btn" :disabled="$v.$invalid">Save product</button>
      <span v-show="$v.$invalid" class="lozenge">
        Errors in the form, please correct.
      </span>
      <div v-if="saveError">
        <span class="lozenge">Error</span> check you fields, something is wrong.
      </div>
    </form>
  </loading-state>
</template>

<script>
  import { numeric, required } from 'vuelidate/lib/validators/';
  import { getProductById, updateProduct } from '/src/productService';
  import LoadingState from '/src/components/LoadingState.vue';

  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        product: {},
        isLoading: false,
        isError: false,
        saveError: false,

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
      product() {
        const p = this.product;

        this.name = p.name || "";
        this.description = p.description || "";
        this.photo = p.photo || "";
        this.color = p.color || "#ffffff";
        this.materials = p.materials || [];
        this.department = p.department || "";
        this.inStock = p.inStock || 0;
        this.price = p.price || 0;
      },
      id() {
        this.fetchProduct();
      }
    },
    methods: {
      fetchProduct() {

        this.isLoading = true;
        this.isError = false;
        if (this.id >= 0) {
          getProductById(this.id)
            .then((p) => this.product = p)
            .catch((e) => this.isError = e)
            .then(() => this.isLoading = false);
        } else {
          this.isLoading = false;
          this.isError = true
        }
      },
      saveProduct() {
        if (!this.$v.$invalid) {
          this.isLoading = true;
          this.saveError = false;

          updateProduct({
              id: this.id,

              name: this.name,
              description: this.description,
              photo: this.photo,
              color: this.color,
              materials: this.materials,
              department: this.department,
              inStock: this.inStock,
              price: this.price
          })
            .then(() => this.$router.push({ name: "productDetails", params: { id: this.id }}))
            .catch(() => this.saveError = true)
            .then(() => this.isLoading = false)
        }

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
    },
    components: {
      LoadingState
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .form-row {
    $labelWidth: 150px;

    position: relative;
    padding-left: $labelWidth;
    margin-bottom: $gutter/2;

    & > label {
      position: absolute;
      margin-left: -$labelWidth;
      padding: 5px 3px;
    }
    label {
      display: block;
      margin-bottom: $gutter/6;
    }
  }
</style>
