<template>
  <div class="card" data-testid="productCard">
    <div class="product-labels">
      <div v-for="label in product.productLabels" :key="label.sortKey">
        <img :src="label.icon" />
      </div>
    </div>
    <product-image
      :url="product.url"
      :image-url="product.images[0].url"
      :title="imgAlt"
    />
    <splash :product="product" />
    <div class="product-name">{{ product.name }}</div>
    <div class="product-summary">
      <swedish-flag v-if="product.fromSweden" />
      <span class="brand">{{ product.manufacturer }}.</span>
      {{ product.packageSizeInformation }}.
      <span>Jmf-pris {{ product.comparisonPrice | price }}.</span>
      <span v-if="product.depositPrice.value" class="deposit">
        Pant {{ product.depositPrice | price }}
      </span>
    </div>
    <div
      v-for="text in product.consumerInformationText"
      :key="text"
      class="consumer-info"
    >
      {{ text }}
    </div>
    <price :product="product" />
    <action-bar :id="product.code" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import get from 'lodash.get'
import ProductImage from './productCard/ProductImage.vue'
import ActionBar from './productCard/ActionBar.vue'
import Splash from './productCard/Splash.vue'
import Price from './productCard/Price.vue'
import SwedishFlag from './productCard/SwedishFlag.vue'
import Product from '~/types/Product'

export default Vue.extend({
  components: {
    ProductImage,
    Splash,
    ActionBar,
    Price,
    SwedishFlag
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      storeId: 'config/getCoopStore',
      user: 'config/getUser',
      cartguid: 'config/getCartGuid'
    }),
    promoDescription(): any {
      return get(this.product, 'potentialPromotions[0].description')
    },
    imgAlt(): string {
      return this.product.name + ' ' + this.product.price + 'kr/st'
    }
  }
})
</script>

<style lang="sass" scoped>
.card
  display: flex
  flex-direction: column
  position: relative
  // box-sizing: border-box;
  min-width: 115px
  max-width: 200px
  flex-basis: 115px
  flex-grow: 1
  margin: 1px
  background-color: white
  padding: 15px
  color: #333

  .product-labels
    position: absolute
    top: 10px
    left: 10px
    width: 30px

    img
      width: 100%

  .product-name
    font-size: 16px
    margin-bottom: 7px

  .product-summary
    font-size: 12px
    margin-bottom: 15px

  .brand
    font-weight: bold

  .consumer-info
    font-size: 14px
    color: rgb(170, 170, 170)
    margin-bottom: 10px

  .deposit
    font-size: 12px
    color: rgb(153, 153, 153)
    font-style: italic
    white-space: nowrap
</style>
