<template>
  <div>
    <div ref="grid" class="grid">
      <template v-for="card in cards">
        <div
          v-if="didShowMore && Array.isArray(card)"
          :key="card.sortKey"
          class="buddy"
        >
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
          :columns="columns"
        />
      </template>
      <component
        :is="components[card.type]"
        v-for="card in unusedCards.slice(0, emptySlots)"
        :key="card.sortKey"
        :card="card"
        :columns="columns"
      />
    </div>

    <div v-if="!loading" class="show-more">
      <Coopknapp
        v-if="!didShowMore && isMobile"
        cta="Visa mer"
        :disabled="loading"
        @click="loadFull"
      />
    </div>
    <div v-else-if="isMobile" class="show-more">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCard from './ProductCard.vue'
import InfoCard from './InfoCard.vue'
import AdCard from './AdCard.vue'
import SkeletonCard from './SkeletonCard.vue'
import Coopknapp from './Coopknapp.vue'
import { CardTypes, Cards } from '~/types/Card'
import event from '@/event'

const initialCardWidth = 150

export default Vue.extend({
  components: {
    Coopknapp
  },
  data() {
    return {
      cardWidth: initialCardWidth,
      width: 0,
      components: {
        [CardTypes.PRODUCT]: ProductCard,
        [CardTypes.SKELETON]: SkeletonCard,
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
    this.fetchCart()
    this.init()
  },
  methods: {
    setContainerWidth() {
      event('set-widths')
      this.setCardWidth()
      if (this.$refs.grid) {
        this.width = this.$refs.grid['clientWidth']
      }
    },
    setCardWidth() {
      if (this.$refs.card) {
        event('card-width')
        this.cardWidth = this.$refs.card[0].$el.clientWidth
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

<style>
/* creds to https://loading.io/css/ */

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #00aa46;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>

<style lang="sass" scoped>
.grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))
  grid-auto-flow: dense
  grid-gap: 2px

  @media (min-width: 425px)
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))

.card
  box-sizing: border-box
  display: flex
  flex-direction: column
  position: relative

.buddy
  grid-column-end: span 2
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))
  grid-gap: 2px

.show-more
  width: 100%
  text-align: center
</style>
