<script type="jsx">
  export default {
    functional: true,
    render(h, { props }) {
      const test = <div class="lozenge">TESTING</div>;
      const level = (props.product.inStock % 3) + 1;
      return (
        <li class={{"product-list--product": true, highlight: props.product.price < 300}}>
          <div class="ribbon" style={{color: props.product.color}}/>
          <img class="product-list--product--image" src={props.product.photo} v-style-when-broken alt=""/>
          <div class="product-list--product--caption">
            <div class="product-list--product--name">
              {h('h' + level, props.product.name)}
            </div>
            <p class="product-list--product--description">
              {props.product.description}
              { props.product.price > 300 ? test : null }
            </p>
          </div>
          <div class="product-list--product--footer">
            { props.product.price < 300 ? test : null }
            {props.product.inStock > 0
              ? <div>
                <p class="product-list--product--price price">
                  {props.product.price} <span v-show={props.product.price > 20} class="lozenge">free shipping</span>
                </p>

                <div class="product-list--product--actions">
                  <router-link class="btn" to={'/product/' + props.product.id}>View product</router-link>
                </div>
              </div>
              : <div>
                <span class="lozenge">OUT OF STOCK</span> 🐼
              </div>}
          </div>
        </li>
      );
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .product-list--product {
    $inRow: 4;
    @include box();
    display: flex;
    flex-direction: column;
    flex-basis: calc(#{100%/$inRow} - #{$gutter});
    margin-left: $gutter;

    &--description {
      font-size: asRem(14px);
    }

    &--caption {
      flex: 1 1 auto;
    }

    @include productCommons();
  }
</style>
