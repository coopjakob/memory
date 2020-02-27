<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div class="product-matrix">
      <ProductCard
        v-for="product in productList"
        :id="product.code"
        :key="product.code"
        :product="product"
      />
    </div>
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <v-btn
          v-if="productList.length <= 6"
          :loading="loading"
          @click="loadMore"
        >
          Visa mer
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable dot-notation */
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
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
  computed: mapGetters({
    productList: 'products/receivedProducts',
    loading: 'products/isLoading'
  }),
  mounted() {
    this.init()
  },
  methods: mapActions({
    init: 'products/init',
    loadMore: 'products/loadMore'
  })
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
