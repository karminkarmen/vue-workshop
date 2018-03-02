import ProductsListItem from '/src/components/ProductsListItem.vue'
import {RouterLinkStub, shallow} from '@vue/test-utils'


function instantiateWithProduct(product) {
  return shallow(ProductsListItem, {
    propsData: {
      product
    },
    stubs: {
      RouterLink: RouterLinkStub
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
    let product;

    beforeEach(() => {
      product = {
        name: "a"
      };
    });

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
      vm.update();

      expect(vm.classes()).not.toContain("highlight");
    });

  });

  describe("Free shipping lozenge", () => {
    it('is visible when price is above 20', () => {
      const vm = instantiateWithProduct({ inStock: 1, price: 20 });
      expect(vm.find(".price .lozenge").isVisible()).toBe(false);
    });

    it('is NOT visible when price is 20 or less', () => {
      const vm = instantiateWithProduct({ inStock: 1, price: 21 });
      expect(vm.find(".price .lozenge").isVisible()).toBe(true);
    });
  });

});