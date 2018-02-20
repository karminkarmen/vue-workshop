<template>
  <form action="#" @submit.prevent="onSubmit" class="box product-edit">
    <div class="spinner" v-if="currentProductStatus.isLoading" />
    <template v-else-if="currentProductStatus.isError">
      <span class="lozenge">Error</span>
      There was an error when fetching the product.
    </template>
    <template v-else>
      <h2>Edit product</h2>

      <div class="form-row">
        <label for="edit-name">Name</label>
        <input id="edit-name" v-model="name" type="text" />
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

      <button :disabled="$v.$invalid" type="submit" class="btn">Save product</button>
      <span class="lozenge" v-if="$v.$invalid">ERRORS</span>
      <span class="lozenge" v-if="saveProductStatus.error">Error saving form, check all fields or try again</span>
    </template>
  </form>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {required, numeric} from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
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
    computed: {
      ...mapGetters([
        "currentProductId",
        "currentProduct",
        "currentProductStatus",
        "saveProductStatus"
      ])
    },
    watch: {
      currentProductId() {
        this.fetchProduct();
      }
    },
    methods: {
      ...mapActions([
        "fetchCurrentProduct",
        "saveProduct"
      ]),
      fetchProduct() {
        this.fetchCurrentProduct()
          .then(() => {
            const product = this.currentProduct;

            this.name = product.name || "";
            this.description = product.description || "";
            this.photo = product.photo || "";
            this.color = product.color || "#ffffff";
            this.materials = product.materials || [];
            this.department = product.department || "";
            this.inStock = product.inStock || 0;
            this.price = product.price || 0;
          });
      },
      onSubmit() {
        if (!this.$v.$invalid && !this.saveProductStatus.isLoading) {
          this.saveProduct({
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
            .then(() => {
              if (!this.saveProductStatus.error) {
                this.$router.push('/product/' + this.id)
              }
            })
        }
      }
    },
    validations: {
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
