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
    functional: true,
    render(h, {props, ...rest}) {
      const footerProps = {
        "class": "product-list--product--footer"
      };

      const footer = props.product.inStock > 0
        ? <div {...footerProps}>
          <p class="product-list--product--price price">
            {commonFilters.asCurrency(props.product.price)} <span v-show={props.product.price > 20} class="lozenge">free shipping</span>
          </p>

          <div class="product-list--product--actions">
            <router-link class="btn" to={{name: 'productDetails', params: {id: props.product.id}}}>View product
            </router-link>
          </div>
        </div>
        : <div {...footerProps}>
          <span class="lozenge">Out of stock</span> 📦🐗
        </div>;

      return (
        <li class={{highlight: props.product.price < 300, "product-list--product": true}}>
          <div class="ribbon" style={{color: props.product.color}}/>
          <img class="product-list--product--image" v-style-when-broken src={props.product.photo} alt=""/>
          <div class="product-list--product--caption">
            <h4 class="product-list--product--name">{props.product.name}</h4>
            <p class="product-list--product--description">
              {props.product.description}
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
