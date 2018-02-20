<template>
  <div class="container">
    <div class="box" v-if="isError">
      Error fetching entity.
    </div>
    <div class="box" v-else-if="isLoading">
      <div class="spinner"></div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>

  export default {
    props: ["isError", "isLoading"]
  }
</script>

<style lang="scss">

</style>
