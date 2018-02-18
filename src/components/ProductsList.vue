<template>
  <div>
    <section class="container">
      <a class="btn" href="#less" @click.prevent="$emit('previous')">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="$emit('next')">Next page</a>
    </section>

    <div v-show="isLoading" class="spinner"/>
    <section v-show="!isLoading" class="container">
      <ul class="product-list">
        <products-list-item
          v-for="product in products"
          :product="product"
        />
      </ul>
    </section>
  </div>
</template>

<script>
  import ProductsListItem from "/src/components/ProductsListItem.vue";

  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      isLoading: Boolean,
      products: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;
  }
</style>
