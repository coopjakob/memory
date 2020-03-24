<template>
  <div v-if="splash" class="splash">
    <div v-if="splash.label" class="promo-text">
      {{ splash.label }}
    </div>
    <div class="price">
      <div class="price-start">
        {{ splash.price }}
      </div>
      <div class="price-end">
        <span class="unit">{{ splash.unit }}</span>
        <span v-if="splash.decimal" class="decimal">{{ splash.decimal }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    splash(): any {
      if (this.description === '') {
        return false
      }

      const regex = /(?<label>\d+ för)? *(?<price>\d+)[:.]-?(?<decimal>[\d]+)? *k?r?\/*(?<unit>.*)/g
      // https://regex101.com/

      const parts = regex.exec(this.description)

      if (parts?.groups) {
        let label = parts.groups.label
        let price = parts.groups.price
        const decimal = parts.groups.decimal
        let unit = parts.groups.unit

        if (unit === 'st' && !decimal) {
          unit = ''
        }

        if (unit === 'kg' && !decimal) {
          label = '1 ' + unit
          unit = ''
        }

        if (!unit && !decimal) {
          price = price + ':-'
        }

        if (unit) {
          unit = '/' + unit
        }

        return { label, price, decimal, unit }
      } else {
        return false
      }
    }
  }
})
</script>

<style scoped>
.splash {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 47px;
  text-align: center;
  line-height: normal;
  color: #ff3300;
  background-image: url('https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg');
  background-size: contain;
}

.promo-text {
  margin-bottom: -2px;
  font-size: 10px;
  line-height: 10px;
}

.price {
  display: flex;
  align-self: flex-start;
  position: relative;
  margin: 0 auto;
  font-size: 22px;
  line-height: 22px;
}

.price-start {
  display: inline-block;
}

.price-end {
  display: inline-block;
  position: relative;
  font-size: 22px;
}

.decimal {
  position: absolute;
  top: 1px;
  left: 0;
  font-size: 12px;
}

.unit {
  font-size: 12px;
}
</style>
