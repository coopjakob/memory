<template>
  <div class="product-matrix">
    <div v-if="error">{{ error }}</div>
    <template v-for="product in productList">
      <ProductCard :id="product.code" :key="product.code" :product="product" />
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable dot-notation */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ProductCard from './ProductCard.vue'

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      productList: 'products/receivedProducts'
    })
  },
  async mounted() {
    await this.$store.dispatch('products/fetch')
  }
})
</script>

<style lang="scss" scoped>
.product-matrix {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: stretch;
}
// .product-matrix::after {
//   content: "";
//   flex: auto;
// }
</style>
