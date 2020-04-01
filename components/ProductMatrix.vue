<template>
  <div>
    <div ref="matrix" class="product-matrix">
      <template v-for="card in cards">
        <div v-if="Array.isArray(card)" :key="card.sortKey" class="buddy">
          <component
            :is="components[_card.type]"
            v-for="_card in card"
            :key="_card.sortKey"
            ref="card"
            :card="_card"
          />
        </div>
        <component
          :is="components[card.type]"
          v-else
          :key="card.sortKey"
          ref="card"
          :card="card"
        />
      </template>
      <component
        :is="components[card.type]"
        v-for="card in unusedCards.slice(0, emptySlots)"
        :key="card.sortKey"
        :card="card"
      />
      <div v-for="n in fillersNeeded" :key="n" class="card fill-last-row" />
    </div>
    <div v-if="!didShowMore && isMobile" class="show-more">
      <button class="coopknapp" :disabled="loading" @click="loadFull">
        Visa mer
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCard from './ProductCard.vue'
import InfoCard from './InfoCard.vue'
import AdCard from './AdCard.vue'
import { CardTypes, Cards } from '~/types/Card'

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
    cards(): Cards {
      if (!this.isMobile || !this.didShowMore) {
        const buddies = this.allCards.filter((card) => Array.isArray(card))
        return this.allCards.slice(0, this.columns * 3 - buddies.length)
      }
      return this.allCards
    },
    ...mapGetters({
      allCards: 'cards/getCards',
      unusedCards: 'cards/getUnusedCards',
      loading: 'products/isLoading',
      didShowMore: 'products/didShowMore'
    }),
    emptySlots(): number {
      const numberOfCards =
        this.cards.length + this.cards.filter(Array.isArray).length
      const itemsOnLastRow = numberOfCards % this.columns
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
  watch: {
    allCards() {
      this.setCardWidth()
    },
    isMobile(newValue) {
      if (newValue === false) {
        this.loadFull()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setContainerWidth)
  },
  mounted() {
    window.addEventListener('resize', this.setContainerWidth)
    this.setContainerWidth()
    this.$bus.$emit('init')
    this.fetchCart()
    this.init()
  },
  methods: {
    setContainerWidth() {
      this.setCardWidth()
      this.width = this.$refs.matrix['clientWidth']
    },
    setCardWidth() {
      this.cardWidth = this.$refs.card[0].$el.clientWidth
    },
    ...mapActions({
      init: 'products/init',
      fetchCart: 'cart/fetchCart',
      loadFull: 'products/loadFull'
    })
  }
})
</script>

<style lang="sass" scoped>
.product-matrix
  display: flex // fallback
  flex-wrap: wrap
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))
  grid-auto-rows: minmax(142px, auto)
  grid-auto-flow: dense

  @media (min-width: 425px)
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
      grid-auto-rows: minmax(150px, auto)

.fill-last-row
  background-color: #E8E8E8

.card
  box-sizing: border-box
  display: flex
  flex-direction: column
  position: relative
  min-width: 142px
  max-width: 230px
  flex-basis: 142px
  flex-grow: 1
  margin: 1px

  @media (min-width: 425px)
    min-width: 150px
    flex-basis: 150px

.buddy
  grid-column-end: span 2
  display: flex
  flex-direction: row

.show-more
  width: 100%
  text-align: center

.coopknapp
  width: 190px
  margin: 10px auto
  padding: 10px
  color: white
  cursor: pointer
  height: 40px
  border-radius: 20px
  background-color: #00aa46
  font-size: 16px
  border: 0
</style>
