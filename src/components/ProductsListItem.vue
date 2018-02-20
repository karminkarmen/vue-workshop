<script type="jsx">
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    render() {
      return (
        <li class={{"product-list--product": true, highlight: this.product.price < 300}}>
          <div class="ribbon" style={{color: this.product.color}}/>
          <img class="product-list--product--image" src={this.product.photo} v-style-when-broken alt=""/>
          <div class="product-list--product--caption">
            <h4 class="product-list--product--name">
              {this.product.name}
            </h4>
            <p class="product-list--product--description">
              {this.product.description}
            </p>
          </div>
          <div class="product-list--product--footer">
            {this.product.inStock > 0
              ? <div>
                <p class="product-list--product--price price">
                  {this.product.price} <span v-show={this.product.price > 20} class="lozenge">free shipping</span>
                </p>

                <div class="product-list--product--actions">
                  <router-link class="btn" to={'/product/' + this.product.id}>View product</router-link>
                </div>
              </div>
              : <div>
                <span class="lozenge">OUT OF STOCK</span> 🐼
              </div>
            }

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
