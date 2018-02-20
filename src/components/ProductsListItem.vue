<script language="jsx">
  export default {
    functional: true,
    render(h, { props }) {
      return (
        <li class={{"product-list--product": true, highlight: props.product.price < 300}}>
          <div class="ribbon" style={{color: props.product.color}}/>
          <img class="product-list--product--image" src={props.product.photo} alt="" v-style-when-broken/>
          <div class="product-list--product--caption">
            <h4 class="product-list--product--name">
              {props.product.name}
            </h4>
            <p class="product-list--product--description">
              {props.product.description}
            </p>
          </div>
          <div class="product-list--product--footer">
            {props.product.inStock > 0
              ? <div>
                <p class="product-list--product--price price">
                  {props.product.price} <span class="lozenge" v-show="product.price > 20">free shipping</span>
                </p>

                <div class="product-list--product--actions">
                  <router-link class="btn" to={'/product/' + props.product.id}>View product</router-link>
                </div>
              </div>
              : <div>
                <span class="lozenge">out of stock</span> 📦📦📦
              </div>}
          </div>
        </li>
      );
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .product-list--product {
    $inRow: 4;
    @extend .box;
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


  .ribbon {
    width: 30px;
    height: 30px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: $border-radius;
    color: crimson;

    &:before {
      content: "";
      display: block;
      text-align: center;
      -webkit-transform: rotate(-45deg);
      -moz-transform:    rotate(-45deg);
      -ms-transform:     rotate(-45deg);
      -o-transform:      rotate(-45deg);
      position: relative;
      top: 0;
      left: -60px;
      width: 120px;
      height: 20px;
      background: currentColor;
    }
  }

  .highlight {
    background: $c-highlight;
  }
</style>
