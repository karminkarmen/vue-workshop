<template>
    <div class="container">
      <article class="product">
        <img class="product--image" v-style-when-broken :src="product.photo" alt=""/>
        <div class="product--caption">
          <h1 class="product--name">
            {{ product.name }}</h1>
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
                <li>wood</li>
                <li>metal</li>
                <li>plastic</li>
              </ul>
            </dd>

            <dt>Availability:</dt>
            <dd>{{ qunatityDescription }}</dd>

            <dt>Price:</dt>
            <dd class="price">
              {{ product.price | asCurrency }}  <span v-show="product.price > 20" class="lozenge">free shipping</span>
            </dd>
          </dl>
          <div class="product--footer">
            <div class="product--actions">
              <a class="btn" href="#">Edit product</a>
            </div>
          </div>
        </div>
      </article>
    </div>

</template>

<script>
  import { getAllProducts } from '/src/productService';
  import commonFilters from '/src/filters';
  import { styleWhenBroken } from '/src/directvies';
  import Navbar from '/src/components/Navbar.vue';

  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      qunatityDescription() {
        console.log("desc");
        if (this.product.inStock <= 0) {
          return "out of stock";
        } else if (this.product.inStock <= 5) {
          const x = this.product.name;
          return "a few";
        } else {
          return "plenty";
        }
      }
    },
    filters: {
      ...commonFilters
    },
    directives: {
      styleWhenBroken
    }
  }
</script>

<style lang="scss">
  @import '../assets/style';

  .product {
    @extend .box;
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
