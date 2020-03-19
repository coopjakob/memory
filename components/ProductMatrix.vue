<template>
  <div>
    <div ref="matrix" class="product-matrix">
      <div v-for="card in cards" :key="card.sortKey">
        <component :is="components[card.type]" ref="card" :card="card" />
      </div>
      <div v-for="card in unusedCards.slice(0, emptySlots)" :key="card.sortKey">
        <component :is="components[card.type]" :card="card" />
      </div>
      <div v-for="n in fillersNeeded" :key="n" class="card fill-last-row" />
    </div>
    <button
      v-if="!didShowMore && isMobile"
      :disabled="loading"
      @click="loadFull"
    >
      Visa mer
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCard from './ProductCard.vue'
import InfoCard from './InfoCard.vue'
import AdCard from './AdCard.vue'
import { CardTypes } from '~/types/Card'

const initialCardWidth = 152

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      cardWidth: initialCardWidth,
      width: 0,
      components: {
        [CardTypes.PRODUCT]: ProductCard,
        [CardTypes.INFO]: InfoCard,
        [CardTypes.AD]: AdCard
      }
    }
  },
  computed: {
    isMobile(): boolean {
      return this.columns <= 3
    },
    columns(): number {
      const columns = Math.floor(this.width / this.cardWidth)
      return Math.max(2, columns)
    },
    ...mapGetters({
      cards: 'cards/getCards',
      unusedCards: 'cards/getUnusedCards',
      loading: 'products/isLoading',
      didShowMore: 'products/didShowMore'
    }),
    emptySlots(): number {
      const itemsOnLastRow = this.cards.length % this.columns
      if (itemsOnLastRow === 0) {
        return 0
      } else {
        return this.columns - itemsOnLastRow
      }
    },
    fillersNeeded(): number {
      return Math.max(this.emptySlots - this.unusedCards.length, 0)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setContainerWidth)
  },
  mounted() {
    window.addEventListener('resize', this.setContainerWidth)
    this.setContainerWidth()
    this.init(this.isMobile)
  },
  methods: {
    setContainerWidth() {
      this.cardWidth = this.$refs.card[0].$el.clientWidth
      this.width = this.$refs.matrix['clientWidth']
    },
    ...mapActions({
      init: 'products/init',
      loadFull: 'products/loadFull'
    })
  }
})
</script>

<style lang="scss" scoped>
.product-matrix {
  display: flex;
  flex-wrap: wrap;
}

.fill-last-row {
  background-color: red;
}
</style>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  position: relative;
  // box-sizing: border-box;
  min-width: 115px;
  max-width: 200px;
  flex-basis: 115px;
  flex-grow: 1;
  margin: 1px;
  background-color: white;
  padding: 15px;
  color: #333;

  @media (min-width: 425px) {
    min-width: 150px;
    flex-basis: 150px;
    padding: 15px;
  }
}
</style>
