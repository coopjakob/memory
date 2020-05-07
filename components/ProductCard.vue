<template>
  <div class="card" :data-clickurl="card.clickUrl">
    <div class="product-labels">
      <div v-for="label in card.productLabels" :key="label.sortKey">
        <img :src="label.icon" />
      </div>
    </div>
    <product-image
      :url="card.url"
      :image-url="card.images[0].url"
      :title="card.name"
    />
    <splash
      v-if="card.potentialPromotions[0]"
      class="splash"
      :description="card.potentialPromotions[0].description"
    />
    <div class="product-name">
      {{ card.name }}
    </div>
    <div class="product-summary">
      <swedish-flag v-if="card.fromSweden" />
      <span class="brand">{{ card.manufacturer }}.</span>
      {{ card.packageSizeInformation }}.
      <span>Jmf-pris {{ card.comparisonPrice | price }}.</span>
    </div>
    <div
      v-for="text in card.consumerInformationText"
      :key="text"
      class="consumer-info"
    >
      {{ text }}
    </div>
    <price :product="card" />
    <action-bar
      :id="card.code"
      :categories="card.categories"
      :init-qty="initQty"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductImage from './productCard/ProductImage.vue'
import Splash from './Splash.vue'
import SwedishFlag from './productCard/SwedishFlag.vue'
import Price from './productCard/Price.vue'
import ActionBar from './productCard/ActionBar.vue'
import { event } from '@/event'
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
    promoDescription(): string | undefined {
      return (
        this.card.potentialPromotions[0] &&
        this.card.potentialPromotions[0].description
      )
    },
    initQty(): number {
      if (!this.$store) {
        return 0
      }

      const cart = this.$store.state.cart

      if (cart.entries) {
        const foundInCart = cart.entries.find(
          (entry: any) => entry.product.code === this.card.code
        )
        if (foundInCart) {
          event('in-cart')
          return foundInCart.quantity
        }
      }
      return 0
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  padding: 15px;
  color: #333;
}
.product-labels {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;

  img {
    width: 100%;
  }
}
.splash {
  position: absolute;
  top: 10px;
  right: 10px;
}
.product-name {
  font-size: 16px;
  margin-bottom: 7px;
}
.product-summary {
  font-size: 12px;
  margin-bottom: 15px;
}
.brand {
  font-weight: bold;
}
.consumer-info {
  font-size: 14px;
  color: rgb(170, 170, 170);
  margin-bottom: 10px;
}
</style>
