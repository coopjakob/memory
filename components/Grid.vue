<template>
  <div ref="grid">
    <grid-view
      v-model="cardWidth"
      :did-show-more="didShowMore"
      :is-mobile="isMobile"
      :cards="cards"
      :empty-slots="emptySlots"
      :width="width"
      :columns="columns"
      :unused-cards="unusedCards"
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
import event from '@/event'

const initialCardWidth = 150

export default Vue.extend({
  components: {
    GridView
  },
  data() {
    return {
      cardWidth: initialCardWidth,
      width: 0
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
        const cardContent: Cards = []

        const limitRows = 3
        const limitSpace = this.columns * limitRows

        let filledSpace = 0
        let index = 0
        while (filledSpace < limitSpace) {
          if (!this.allCards[index]) {
            break
          }

          if (this.didShowMore && Array.isArray(this.allCards[index])) {
            if (limitSpace - filledSpace > 1) {
              cardContent.push(this.allCards[index])
              filledSpace = filledSpace + 2
            } else {
              cardContent.push(this.allCards[index][1])
              filledSpace++
            }
          } else {
            cardContent.push(this.allCards[index])
            filledSpace++
          }

          index++
        }
        return cardContent
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
    window.removeEventListener('resize', this.setContainerWidth)
  },
  mounted() {
    event('grid-mounted')
    window.addEventListener('resize', this.setContainerWidth)
    this.setContainerWidth()
    // this.fetchCart()
    this.init()
  },
  methods: {
    setContainerWidth() {
      event('set-widths')
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
