<template>
  <loading-header :isLoading="isLoading" :isError="isError">
      <form @submit.prevent="saveProduct" class="box product-edit">
        <h2>Edit product X</h2>

        <div class="form-row">
          <label for="edit-name">Name</label>
          <input id="edit-name" v-model.trim="name" @change="$v.name.$touch()" type="text" />
        </div>

        <div class="form-row">
          <label for="edit-photo">Photo</label>
          <input id="edit-photo" v-model.trim.lazy="photo" @change="$v.photo.$touch()" type="text" />
          <img class="photo-preview" v-style-when-broken :src="photo" />
        </div>

        <div class="form-row">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc" v-model="description" @change="$v.description.$touch()"></textarea>
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
          <input type="number" v-model="inStock" @change="$v.inStock.$touch()" id="edit-stock" />
        </div>

        <div class="form-row">
          <label for="edit-price">Price</label>
          <input type="number" v-model.number="price" @change="$v.price.$touch()" id="edit-price" />
        </div>

        <button type="submit" :disabled="$v.$invalid" class="btn">Save product</button>
        <div class="lozenge" v-if="$v.$invalid">Form incorrect, please check all fields</div>
        <div class="lozenge" v-if="saveError ">Error saving the form, check your fields</div>
      </form>
  </loading-header>
</template>

<script>
  import { getProductById, updateProduct } from '/src/productService';
  import commonFilters from '/src/filters';
  import { styleWhenBroken } from '/src/directvies';
  import { required, numeric} from 'vuelidate/lib/validators';
  import LoadingHeader from '/src/components/LoadingHeader.vue';

  export default {
    props: {
      id: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
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
      };
    },
    watch: {
      id() {
        this.fetchProduct();
      }
    },
    created() {
      this.fetchProduct();
    },
    methods: {
      async fetchProduct() {
        this.isLoading = true;
        this.isError = false;

        if (this.id >= 0) {
          try {
            const p = await getProductById(this.id);

            this.name = p.name || "";
            this.description = p.description || "";
            this.photo = p.photo || "";
            this.color = p.color || "#ffffff";
            this.materials = p.materials || [];
            this.department = p.department || "";
            this.inStock = p.inStock || 0;
            this.price = p.price || 0;
          } catch(e) {
            this.isError = true;
          }
          this.isLoading = false;

        } else {

          this.name = "";
          this.description = "";
          this.photo = "";
          this.color = "#ffffff";
          this.materials = [];
          this.department = "";
          this.inStock = 0;
          this.price = 0;

          this.isLoading = false;
          this.isError = true;
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
            price: this.price,
          })
            .then(() => this.$router.push({ name: "productDetails", params: { id: this.id } }))
            .catch(() => this.saveError = true)
            .then(() => this.isLoading = false);
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
    filters: {
      ...commonFilters
    },
    directives: {
      styleWhenBroken
    },
    components: {
      LoadingHeader
    }
  }
</script>

<style lang="scss">
  @import '../assets/style';

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
