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

describe('ProductsListItem.vue', () => {

	it('renders props.product.name when passed', () => {
		const name = "awesome product name";
		const wrapper = instantiateWithProduct({
        name: name
		});
		expect(wrapper.html()).toContain(name);
	});

  describe('Highlights product', () => {

    it('should be highlighted if price is below 300', () => {
      const vm = instantiateWithProduct({ price: 299 });
      expect(vm.classes()).toContain("highlight");
    });

    it('should not be highlighted if price is 300 or more', () => {
      const vm = instantiateWithProduct({ price: 300 });
      expect(vm.classes()).not.toContain("highlight");
    });

    it('updates the the highlighting when product changes', () => {
      const product = { price: 299 };
      const vm = instantiateWithProduct(product);

      product.price = 300;
      vm.setProps(product);

      expect(vm.classes()).not.toContain("highlight");
    });

  });
});