<template>
  <div>
    <div ref="matrix" class="product-matrix">
      <div v-for="card in cards" :key="card.sortKey">
        <component :is="components[card.type]" :card="card" />
      </div>
      <div v-for="card in fillers" :key="card.sortKey">
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
import { CardTypes, Cards } from '~/types/Card'

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      width: 0,
      components: {
        [CardTypes.PRODUCT]: ProductCard,
        [CardTypes.INFO]: InfoCard,
        [CardTypes.AD]: AdCard
      }
    }
  },
  computed: {
    columns(): number {
      const columns = Math.floor(this.width / 152)
      return Math.max(2, columns)
    },
    cards(): Cards {
      return this.allCards.cards
    },
    fillers(): Cards {
      return this.allCards.filler.slice(0, this.fillersNeeded)
    },
    rows(): number {
      return this.columns > 3 ? 3 : 999
    },
    ...mapGetters({
      allCards: 'cards/getCards',
      fillerCards: 'cards/getFillerCards',
      authToken: 'config/authToken',
      user: 'config/getUser',
      loading: 'products/isLoading'
    }),
    fillersNeeded(): Number {
      const itemsOnLastRow = this.cards.length % this.columns
      if (itemsOnLastRow === 0) {
        return 0
      } else {
        return this.columns - itemsOnLastRow
      }
    }
  },
  watch: {
    columns(columns) {
      if (columns >= 4) {
        this.loadMore()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setContainerWidth)
  },
  mounted() {
    window.addEventListener('resize', this.setContainerWidth)
    this.setContainerWidth()
    this.init()
  },
  methods: {
    setContainerWidth() {
      this.width = this.$refs.matrix['clientWidth']
    },
    ...mapActions({
      init: 'products/init',
      loadMore: 'products/loadMore'
    })
  }
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
