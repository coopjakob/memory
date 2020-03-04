<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div class="product-matrix">
      <div v-for="card in cards" :key="card.sortKey">
        <component :is="components[card.type]" :card="card" />
      </div>
    </div>
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <v-btn v-if="cards.length <= 6" :loading="loading" @click="loadMore">
          Visa mer
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCard from './ProductCard.vue'
import InfoCard from './InfoCard.vue'
import AdCard from './AdCard.vue'
import { CardTypes } from '~/types/Card'

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      error: '',
      components: {
        [CardTypes.PRODUCT]: ProductCard,
        [CardTypes.INFO]: InfoCard,
        [CardTypes.AD]: AdCard
      }
    }
  },
  computed: mapGetters({
    cards: 'cards/getCards',
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
