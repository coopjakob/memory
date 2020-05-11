<template>
  <div ref="grid">
    <grid-view
      :did-show-more="didShowMore"
      :is-mobile="isMobile"
      :cards="cards"
      :empty-slots="emptySlots"
      :width="width"
      :columns="columns"
      :selected-fillers="selectedFillers"
      :loading="loading"
      :load-full="loadFull"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import GridView from './GridView.vue'
import { Cards } from '~/types/Card'
import { event } from '@/event'

export default Vue.extend({
  components: {
    GridView
  },
  data() {
    return {
      width: 320,
      cardWidth: 150,
      lastSelectedCards: [] as Cards
    }
  },
  computed: {
    cards(): Cards {
      return this.selectedCards()
    },
    isMobile(): boolean {
      return this.columns <= 3
    },
    columns(): number {
      const gap = 2 // px
      const columns = Math.floor((this.width + gap) / (this.cardWidth + gap))
      return Math.max(2, columns)
    },
    selectedFillers(): Cards {
      // const cards = this.unusedCards.slice(0, this.emptySlots)
      // cards.forEach((card) => {
      //   event('show-card', card)
      // })
      // return cards
      return []
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
    }
  },
  watch: {
    isMobile(newValue) {
      if (newValue === false) {
        event('not-phone')
        this.loadFull()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setGridWidth)
  },
  mounted() {
    event('grid-mounted')
    window.addEventListener('resize', this.setGridWidth)
    this.setGridWidth()
    this.fetchCart()
    this.init()
  },
  methods: {
    selectedCards() {
      const cardContent: Cards = this.lastSelectedCards
      const newCards: Cards = this.allCards
      // const oldCards: Cards = this.lastSelectedCards

      const limitRows = 3
      let limitSpace = this.columns * limitRows

      if (this.isMobile && this.didShowMore) {
        limitSpace = Infinity
      }

      let filledSpace = 0
      let index = 0
      while (filledSpace < limitSpace) {
        if (!newCards[index]) {
          break
        }

        if (this.didShowMore && Array.isArray(newCards[index])) {
          if (limitSpace - filledSpace > 1) {
            if (!cardContent[index] || cardContent[index].type === 'skeleton') {
              event('show-card', newCards[index][0])
              event('show-card', newCards[index][1])
              cardContent[index] = newCards[index]
            } else if (newCards[index][1].name === cardContent[index].name) {
              event('show-card', newCards[index][0])
              cardContent[index] = newCards[index]
            } else if (Array.isArray(cardContent[index])) {
              if (newCards[index][0].name !== cardContent[index][0].name) {
                event('show-card', newCards[index][0])
                cardContent[index][0] = newCards[index][0]
              }
              if (newCards[index][1].name !== cardContent[index][1].name) {
                event('show-card', newCards[index][1])
                cardContent[index][1] = newCards[index][1]
              }
            }
            filledSpace = filledSpace + 2
          } else {
            if (!cardContent[index] || cardContent[index].type === 'skeleton') {
              event('show-card', newCards[index][1])
              cardContent[index] = newCards[index][1]
            } else if (newCards[index].name !== cardContent[index].name) {
              event('show-card', newCards[index][1])
              cardContent[index] = newCards[index][1]
            }
            filledSpace++
          }
        } else {
          if (!cardContent[index] || cardContent[index].type === 'skeleton') {
            event('show-card', newCards[index])
            cardContent[index] = newCards[index]
          } else if (newCards[index].name !== cardContent[index].name) {
            event('show-card', newCards[index])
            cardContent[index] = newCards[index]
          }
          filledSpace++
        }

        index++
      }
      cardContent.length = index

      this.lastSelectedCards = cardContent
      return cardContent
    },
    setGridWidth() {
      event('grid-width')
      if (this.$refs.grid) {
        this.width = this.$refs.grid['clientWidth']
      }
    },
    ...mapActions({
      init: 'products/init',
      fetchCart: 'cart/fetchCart',
      loadFull: 'products/loadFull'
    })
  }
})
</script>
