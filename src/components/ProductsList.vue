<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="$emit('previousPage')">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="$emit('nextPage')">Next page</a>
    </section>

    <div v-show="isLoading" class="spinner"></div>
    <section v-show="!isLoading" class="container">
      <ul class="product-list">
        <products-list-item
        v-for="product in products"
        :product="product"
        :key="product.id"
      />
      </ul>
    </section>
  </div>
</template>

<script>
  import ProductsListItem from '/src/components/ProductsListItem.vue';

  export default {
     props: {
        page: Number,
        isLoading: Boolean,
        products: Array
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import '../assets/style';

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }

</style>
