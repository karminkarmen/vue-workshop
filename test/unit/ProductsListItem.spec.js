import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import ProductsListItem from '/src/components/ProductsListItem.vue'

function instantiateWithProduct(product) {
  return shallow(ProductsListItem, {
    context: {
      props: {
        product
      }
    }
  });
}

describe('ProductsListItem.vue', function() {

	it('renders props.product.name when passed', function() {
		const name = "awesome product name";
		const wrapper = instantiateWithProduct({
        name: name
		});
		expect(wrapper.html()).to.include(name)
	});

  describe('Highlights product', function() {

    it('should be highlighted if price is below 300', function() {
      const vm = instantiateWithProduct({ price: 299 });
      expect(vm.classes()).to.contain("highlight");
    });

    it('should not be highlighted if price is 300 or more', function() {
      const vm = instantiateWithProduct({ price: 300 });
      expect(vm.classes()).to.not.contain("highlight");
    });

    it('updates the the highlighting when product changes', function() {
      const product = { price: 299 };
      const vm = instantiateWithProduct(product);

      product.price = 300;
      vm.setProps(product);

      expect(vm.classes()).to.not.contain("highlight");
    });

  });
});