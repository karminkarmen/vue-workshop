<template>
  <li class="product-list--product" :class="{ highlight: product.price < 300 }">
    <div class="ribbon" :style="{ color: product.color }" />
    <img class="product-list--product--image" :src="product.photo" v-style-when-broken alt=""/>
    <div class="product-list--product--caption">
      <h4 class="product-list--product--name">
        {{ product.name }}
      </h4>
      <p class="product-list--product--description">
        {{ product.description }}
      </p>
    </div>
    <div class="product-list--product--footer">
      <template v-if="product.inStock > 0">
        <p class="product-list--product--price price">
          {{ product.price | asCurrency }} <span v-show="product.price > 20" class="lozenge">free shipping</span>
        </p>

        <div class="product-list--product--actions">
          <a class="btn" href="#">View product</a>
        </div>
      </template>
      <template v-else>
        <span class="lozenge">OUT OF STOCK</span> 🐼
      </template>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .product-list--product {
    $inRow: 4;
    @include box();
    display: flex;
    flex-direction: column;
    flex-basis: calc(#{100%/$inRow} - #{$gutter});
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
