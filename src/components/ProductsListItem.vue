<template>
  <li class="product-list--product"
    :class="{ highlight: product.price < 300 }"
  >
    <div class="ribbon" :style="{ color: product.color }" />
    <img class="product-list--product--image" v-style-when-broken :src="product.photo" alt=""/>
    <div class="product-list--product--caption">
      <h4 class="product-list--product--name">{{ product.name }}</h4>
      <p class="product-list--product--description">
        {{ product.description }}
      </p>
    </div>
    <div class="product-list--product--footer">
      <template v-if="product.inStock > 0">
        <p class="product-list--product--price price">
          {{ product.price | asCurrency }}  <span v-show="product.price > 20" class="lozenge">free shipping</span>
        </p>

        <div class="product-list--product--actions">
          <router-link class="btn" :to="{ name: 'productDetails', params: { id: product.id } }">View product</router-link>
        </div>
      </template>
      <template v-else>
        <span class="lozenge">Out of stock</span> 📦🐗
      </template>
    </div>
  </li>
</template>

<script>
  import commonFilters from '/src/filters';
  import { styleWhenBroken } from '/src/directvies';

  export default {
    props: {
      product: {
        type: Object,
        default: {}
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

  .product-list--product {
      $inRow: 4;
      flex-basis: calc(#{100%/$inRow} - #{$gutter});

      @extend .box;
      display: flex;
      flex-direction: column;
      margin-left: $gutter;

      &--description{
        font-size: asRem(14px);
      }

      &--caption {
        flex: 1 1 auto;
      }

      @include productCommons();
    }
</style>
