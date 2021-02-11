<template>
  <div ref="grid">
    <grid-view
      :did-show-more="true"
      :is-mobile="isMobile"
      :cards="cards"
      :empty-slots="emptySlots"
      :width="width"
      :columns="columns"
      :selected-fillers="[]"
      :loading="false"
      :load-full="loadFull"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GridView from '@/components/GridView.vue'
import { Cards } from '~/types/Card'
import { event } from '@/event'
import { generateSkeletons } from '@/store/cards'

export default Vue.extend({
  components: {
    GridView
  },
  data() {
    return {
      width: 320,
      cardWidth: 150
    }
  },
  computed: {
    cards(): Cards {
      return generateSkeletons(10)
    },
    isMobile(): boolean {
      return this.columns <= 3
    },
    columns(): number {
      const columns = Math.floor(this.width / this.cardWidth)
      return Math.max(2, columns)
    },
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
  beforeDestroy() {
    window.removeEventListener('resize', this.setGridWidth)
  },
  mounted() {
    window.addEventListener('resize', this.setGridWidth)
  },
  methods: {
    setGridWidth() {
      event('grid-width')
      if (this.$refs.grid) {
        this.width = this.$refs.grid['clientWidth']
      }
    }
  }
})
</script>
