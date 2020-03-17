<template>
  <div
    class="pricing"
    :data-product="product.code"
    data-category-lvl-1="0"
    data-category-lvl-3="0"
  >
    <div v-if="isMedmera" class="members-only">
      Medlemspris
    </div>
    <div v-if="maxUseText" class="max-use">
      {{ maxUseText }}
    </div>
    <div class="product-price" :class="{ 'is-promo': promoPrice }">
      <div v-if="promoPrice" class="promo-price">
        {{ promoPrice }}<span class="unit">/st</span>
      </div>
      <div class="pick-price">
        {{ product.price | price }}<span class="unit">/st</span>
      </div>
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
    isMedmera(): any {
      return this.product.potentialPromotions?.[0]?.medmera
    },
    promoPrice(): any {
      return this.product.promotionPrice?.formattedValue
    },
    maxUseText(): any {
      return this.product.potentialPromotions?.[0]?.maxUseText
    }
  }
})
</script>

<style lang="scss" scoped>
.pricing {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.members-only {
  margin-bottom: 10px;
  align-self: flex-start;

  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  color: rgb(0, 85, 55);
  background-color: rgb(170, 210, 60);
  border-radius: 999px;
  padding: 2px 10px;
}
.max-use {
  font-size: 12px;
  color: rgb(255, 51, 0);
}
.product-price {
  font-size: 20px;
  margin-bottom: 10px;
}
.promo-price {
  display: inline-block;
  margin-right: 0.25em;
  color: rgb(255, 51, 0);
}
.pick-price {
  display: inline-block;
}
.is-promo .pick-price {
  font-size: 12px;
  color: rgb(74, 74, 74);
  text-decoration-line: line-through;
}
.is-promo .unit {
  font-size: 14px;
}
.is-promo .pick-price .unit {
  font-size: inherit;
}

.unit {
  font-size: 14px;
}
</style>
