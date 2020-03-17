<template>
  <div v-if="splash" class="splash">
    <div v-if="splash.label" class="promo-text">
      {{ splash.label }}
    </div>
    <div class="price">
      {{ splash.price }}<span class="unit">{{ splash.unit }}</span>
      <span v-if="splash.decimal" class="decimal">{{ splash.decimal }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Product from '~/types/Product'

export default Vue.extend({
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  computed: {
    splash(): any {
      if (!this.product.potentialPromotions?.[0]) {
        return false
      }
      const regex = /(?<label>\d+ för )*(?<price>\d+):(?<decimal>[-\d]+) *\/*(?<unit>.*)/g
      // https://regex101.com/

      const parts = regex.exec(this.product.potentialPromotions[0].description)

      if (!parts) {
        window.console.error('Kan inte lista ut erbjudandet i splash')
        return false
      }

      const label = parts[1]
      let price = parts[2]
      let decimal = parts[3]
      let unit = parts[4]

      if (unit === 'st' && decimal === '-') {
        price = price + ':-'
        decimal = ''
        unit = ''
      }

      if (unit === '' && decimal === '-') {
        price = price + ':-'
        decimal = ''
      }

      if (unit !== '') {
        unit = '/' + unit
      }

      return { label, price, decimal, unit }
    }
  }
})
</script>

<style lang="scss" scoped>
.splash {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 64px;
  height: 47px;
  font-family: 'Coop New', 'CoopNew-Black', sans-serif;
  text-align: center;
  font-size: 22px;
  color: rgb(255, 51, 0);
  background-image: url('https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg');
  background-size: contain;
  .promo-text {
    font-size: 10px;
    text-align: center;
    margin-bottom: -5px;
  }
  .price {
    display: inline-block;
    align-self: flex-start;
    position: relative;
    margin: 0 auto;
  }
  .decimal {
    position: absolute;
    top: 2px;
    right: 3px;
    font-size: 10px;
  }
  .unit {
    font-size: 10px;
  }
}
</style>
