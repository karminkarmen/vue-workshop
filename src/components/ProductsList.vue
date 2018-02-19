<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="$emit('previousPage')">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="$emit('nextPage')">Next page</a>
    </section>

    <section class="container">
      <div v-if="isLoading" class="spinner" />
      <ul v-else class="product-list">
        <products-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </ul>
    </section>
  </div>
</template>

<script>
  import ProductsListItem from "/src/components/ProductsListItem";

  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      isLoading: {
        type: Boolean
      },
      products: {
        type: Array,
        required: true
      }
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }

</style>
