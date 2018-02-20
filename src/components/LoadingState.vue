<template>
  <div class="container">
    <div class="box" v-if="isLoading">
      <div class="spinner"></div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>

  export default {
    props: ["isError", "isLoading"],
    watch: {
      isError() {
        if (this.isError === true) {
          this.$router.replace({ name: "NotFound" });
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
