<template>
  <div id="app">

    <navbar />

    <router-view></router-view>

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
  @import './assets/style';

</style>
