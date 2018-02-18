<template>
  <div id="app">

    <navbar class="container" />

    <div class="container">
      <router-view />
    </div>

  </div>
</template>

<script>
  import Navbar from '/src/components/Navbar.vue';

	export default {
    components: {
      Navbar
    }
	}
</script>

<style lang="scss">
  @import "./assets/style";
</style>
