<template>
    <nav class="navbar container">
      <a class="navbar--brand" :title="name + '2'" href="#">{{ name }} (work)shop</a>
      <ul class="navbar--menu">
        <li class="active"><a href="#">Somewhere</a></li>
        <li class="active"><a href="#">Over</a></li>
        <li class="active"><a href="#">The rainbow</a></li>
      </ul>
    </nav>
</template>

<script>
  export default {
    data: () => {
      return {
        name: "Vue.js"
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .navbar {
    @extend .box;
    line-height: asRem(30px);
    @include clearfix();

    &--brand {
      font-size: asRem(20px);
      float: left;
      margin-right: $gutter;
      color: $c-black;
      &:hover {
        text-decoration: none;
      }
    }

    &--menu {
      float: left;
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: inline-block;
        margin-right: $gutter/2;
      }
    }
  }
</style>
