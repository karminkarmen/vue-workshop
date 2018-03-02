<script type="jsx">
  import commonFilters from '/src/filters';
  import {styleWhenBroken} from '/src/directvies';

  export default {
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    render(h) {
      const footerProps = {
        "class": "product-list--product--footer"
      };

      const footer = this.product.inStock > 0
        ? <div {...footerProps}>
          <p class="product-list--product--price price">
            {commonFilters.asCurrency(this.product.price)} <span v-show={this.product.price > 20} class="lozenge">free shipping</span>
          </p>

          <div class="product-list--product--actions">
            <router-link class="btn" to={{name: 'productDetails', params: {id: this.product.id}}}>View product
            </router-link>
          </div>
        </div>
        : <div {...footerProps}>
          <span class="lozenge">Out of stock</span> 📦🐗
        </div>;

      return (
        <li class={{highlight: this.product.price < 300, "product-list--product": true}}>
          <div class="ribbon" style={{color: this.product.color}}/>
          <img class="product-list--product--image" v-style-when-broken src={this.product.photo} alt=""/>
          <div class="product-list--product--caption">
            <h4 class="product-list--product--name">{this.product.name}</h4>
            <p class="product-list--product--description">
              {this.product.description}
            </p>
          </div>
          {footer}
        </li>
      );
    },
    directives: {
      styleWhenBroken
    }
  }
</script>

<style lang="scss">
  @import '../assets/style';

  .product-list--product {
    $inRow: 4;
    flex-basis: calc(#{100%/$inRow} - #{$gutter});

    @extend .box;
    display: flex;
    flex-direction: column;
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
