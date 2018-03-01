<template>
  <div id="app">

    <nav class="navbar container">
      <a class="navbar--brand" href="#" :title="name">{{ name }} (work)shop</a>
      <ul class="navbar--menu">
        <li class="active"><a href="#">Somewhere</a></li>
        <li class="active"><a href="#">Over</a></li>
        <li class="active"><a href="#">The rainbow</a></li>
      </ul>
    </nav>

    <section class="container">
      <a class="btn" href="#less" @click.prevent="page -= 1">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="nextPage">Next page</a>
    </section>

    <section class="container">
      <ul class="product-list">
        <li class="product-list--product">
          <div class="ribbon" style="color: orangered;" />
          <img class="product-list--product--image" :src="product.photo" alt=""/>
          <div class="product-list--product--caption">
            <h4 class="product-list--product--name">{{ product.name }}</h4>
            <p class="product-list--product--description">
              {{ product.description }}
            </p>
          </div>
          <div class="product-list--product--footer">
            <template v-if="product.inStock > 0">
              <p class="product-list--product--price price">
                ${{ product.price }}  <span v-show="product.price > 20" class="lozenge">free shipping</span>
              </p>

              <div class="product-list--product--actions">
                <a class="btn" href="#">View product</a>
              </div>
            </template>
            <template v-else>
              <span class="lozenge">Out of stock</span> 📦🐗
            </template>
          </div>
        </li>
      </ul>
    </section>

    <div class="container">
      <article class="product">
        <img class="product--image" :src="product.photo" alt=""/>
        <div class="product--caption">
          <h1 class="product--name">
            {{ product.name }}</h1>
          <div class="product--category">
            Category: <a href="#">{{ product.department }}</a>
          </div>

          <p class="product--description">
            {{ product.description }}
          </p>
          <dl class="product--attributes">
            <dt>Color:</dt>
            <dd>
              <div class="color-swatch" style="background-color: orangered;"></div>
            </dd>
            <dt>Materials:</dt>
            <dd>
              <ul class="product--materials">
                <li>wood</li>
                <li>metal</li>
                <li>plastic</li>
              </ul>
            </dd>

            <dt>Availability:</dt>
            <dd v-if="product.inStock <= 0">out of stock</dd>
            <dd v-else-if="product.inStock <= 5">a few</dd>
            <dd v-else>plenty</dd>

            <dt>Price:</dt>
            <dd class="price">
              ${{ product.price }}  <span v-show="product.price > 20" class="lozenge">free shipping</span>
            </dd>
          </dl>
          <div class="product--footer">
            <div class="product--actions">
              <a class="btn" href="#">Edit product</a>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="container">

      <form action="#" class="box product-edit">
        <h2>Edit product X</h2>

        <div class="form-row">
          <label for="edit-name">Name</label>
          <input id="edit-name" v-model.trim="product.name" type="text" />
        </div>

        <div class="form-row">
          <label for="edit-photo">Photo</label>
          <input id="edit-photo" v-model.trim.lazy="product.photo" type="text" />
          <img class="photo-preview" :src="product.photo" />
        </div>

        <div class="form-row">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc" v-model="product.description"></textarea>
        </div>

        <div class="form-row">
          <label for="edit-color">Color</label>
          <input type="color" v-model.trim="product.color" id="edit-color" />
        </div>

        <div class="form-row">
          <label>Materials</label>
          <div>
            <label><input type="checkbox" value="Steel" v-model="product.materials"/> Steel</label>

          </div>
        </div>

        <div class="form-row">
          <label for="edit-departmnet">Department</label>
          <select id="edit-departmnet" v-model="product.department">
            <option>Books</option>
            <option>Movies</option>
            <option>Music</option>
            <option>Games</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Home</option>
            <option>Garden</option>
            <option>Tools</option>
            <option>Grocery</option>
            <option>Health</option>
            <option>Beauty</option>
            <option>Toys</option>
            <option>Kids</option>
            <option>Baby</option>
            <option>Clothing</option>
            <option>Shoes</option>
            <option>Jewelery</option>
            <option>Sports</option>
            <option>Outdoors</option>
            <option>Automotive</option>
            <option>Industrial</option>
          </select>
        </div>

        <div class="form-row">
          <label for="edit-stock">In stock</label>
          <input type="number" v-model="product.inStock" id="edit-stock" />
        </div>

        <div class="form-row">
          <label for="edit-price">Price</label>
          <input type="number" v-model.number="product.price" id="edit-price" />
        </div>

        <button class="btn">Save product</button>
      </form>
    </div>

    <div class="container">
      <div class="box">
        <div class="spinner"></div>
      </div>
    </div>

  </div>
</template>

<script >
	export default {
		data() {
		  return {
		    name: "Vue.js for Profitroom",
        page: 1,
        product: {
          "id": 0,
          "name": "My updated product",
          "price": "219.00",
          "department": "Home",
          "color": "#51452b",
          "description": "Consequatur nam distinctio modi et omnis odio optio. Ut ipsum voluptatem. Voluptatem est voluptatem a. Sed et et sunt aut. Error hic dolor quas velit aut omnis repudiandae.",
          "photo": "/product-photos/1.jpeg",
          "inStock": 3,
          "materials": [
            "Granite",
            "Plastic"
          ]
        }
      };
    },
    methods: {
      nextPage() {
        this.page += 1;
      }
    }

	}
</script>

<style lang="scss">
  @import './assets/style';

</style>
