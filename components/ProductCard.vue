<template>
  <div class="card" data-testid="productCard">
    <div class="product-labels">
      <div v-for="label in card.productLabels" :key="label.sortKey">
        <img :src="label.icon" />
      </div>
    </div>
    <product-image
      :url="card.url"
      :image-url="card.images[0].url"
      :title="imgAlt"
    />
    <div class="splash">
      <splash :product="card" />
    </div>
    <div class="product-name">
      {{ card.name }}
    </div>
    <div class="product-summary">
      <swedish-flag v-if="card.fromSweden" />
      <span class="brand">{{ card.manufacturer }}.</span>
      {{ card.packageSizeInformation }}.
      <span>Jmf-pris {{ card.comparisonPrice | price }}.</span>
      <span v-if="card.depositPrice.value" class="deposit">
        Pant {{ card.depositPrice | price }}
      </span>
    </div>
    <div
      v-for="text in card.consumerInformationText"
      :key="text"
      class="consumer-info"
    >
      {{ text }}
    </div>
    <price :product="card" />
    <action-bar :id="card.code" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import get from 'lodash.get'
import ProductImage from './productCard/ProductImage.vue'
import ActionBar from './productCard/ActionBar.vue'
import Splash from './productCard/Splash.vue'
import Price from './productCard/Price.vue'
import SwedishFlag from './productCard/SwedishFlag.vue'
import { ProductCard } from '~/types/Card'

export default Vue.extend({
  components: {
    ProductImage,
    Splash,
    ActionBar,
    Price,
    SwedishFlag
  },
  props: {
    card: {
      type: Object as () => ProductCard,
      required: true
    }
  },
  computed: {
    promoDescription(): any {
      return get(this.card, 'potentialPromotions[0].description')
    },
    imgAlt(): string {
      return this.card.name + ' ' + this.card.price + 'kr/st'
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

  .splash
    position: absolute
    top: 10px
    right: 10px

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
