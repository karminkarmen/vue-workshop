<template>
    <div class="container">
      <div class="box" v-if="isError">
        Error fetching product.
      </div>
      <div class="box" v-else-if="isLoading">
        <div class="spinner"></div>
      </div>
      <article v-else class="product">
        <img class="product--image" :src="product.photo" v-style-when-broken alt=""/>
        <div class="product--caption">
          <h1 class="product--name">
            {{ product.name }}
          </h1>
          <div class="product--category">
            Category: <a href="#">{{ product.department }}</a>
          </div>

          <p class="product--description">
            {{ product.description }}
          </p>
          <dl class="product--attributes">
            <dt>Color:</dt>
            <dd>
              <div class="color-swatch" :style="{ 'background-color': product.color }"></div>
            </dd>
            <dt>Materials:</dt>
            <dd>
              <ul class="product--materials">
                <li v-for="(material, index) in product.materials" :key="index">{{ material }}</li>
              </ul>
            </dd>

            <dt>Availability:</dt>
            <dd>{{ quantityDescription }}</dd>

            <dt>Price:</dt>
            <dd class="price">
              {{ product.price | asCurrency }} <span v-show="product.price > 20" class="lozenge">free shipping</span>
            </dd>
          </dl>
          <div class="product--footer">
            <div class="product--actions">
              <router-link class="btn" :to="'/product/' + product.id + '/edit'">Edit product</router-link>
            </div>
          </div>
        </div>
      </article>
    </div>

</template>

<script>
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
        product: {},
        isLoading: false,
        isError: false
      }
    },
    computed: {
      quantityDescription() {
        console.log("describe called");

        if (this.product.inStock <= 0) {
          return "out of stock";
        } else if (this.product.inStock <= 5) {
          return "a few";
        } else {
          return "plenty";
        }
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
        this.isError = null;
        if (this.id >= 0) {
          getProductById(this.id)
            .then((p) => this.product = p)
            .catch((e) => this.isError = e)
            .then(() => this.isLoading = false);
        } else {
          this.isLoading = false;
          this.isError = true
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .product {
    @include box();
    @include clearfix();
    @include productCommons();

    &--image {
      position: relative;
      float: right;
      max-width: 300px;
      margin-left: $gutter;
      z-index: 1;
    }

    &--attributes {
      $verticalPadding: $gutter/3;
      position: relative;
      border-top: solid 1px #ccc;
      max-width: 400px;
      dt {
        padding: $verticalPadding;
        position: absolute;
        left: 0;
      }
      dd {
        margin: 0;
        padding: $verticalPadding $verticalPadding $verticalPadding 120px;

        border-bottom: solid 1px #ccc;

        ul {
          margin: 0;
          padding: 0 20px;
        }
      }
    }
  }
</style>
