<template>
  <div class="container">
    <div v-if="!!isLoading" class="spinner"></div>
    <div v-else-if="!!isError" class="box">
      Error loading product.
    </div>
    <slot v-else />
  </div>
</template>

<script>

  export default {
    props: {
      isLoading: {
        default: false
      },
      isError: {
        default: false
      }
    }
  }
</script>