<template>
  <div class="card extra-card ad-card" :style="classObject">
    <div class="action">
      <a class="button" :href="card.link">
        {{ card.buttonText || 'Handla nu' }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AdCard } from '@/types/Card'

export default Vue.extend({
  props: {
    card: {
      type: Object as () => AdCard,
      required: true
    },
    columns: {
      type: Number,
      required: true
    }
  },
  computed: {
    classObject() {
      let style = {}

      if (this.card.image) {
        style = {
          ...style,
          'background-image': `url('${this.card.image}')`
        }
      }

      if (this.card.column) {
        const row = this.card.row || 1
        let column = this.card.column

        if (column === -1) {
          column = 'last'
        }

        if (column === 'last') {
          column = -2
        }

        if (column > this.columns) {
          column = this.columns
        }

        if (column < -this.columns) {
          column = 1
        }

        style = {
          ...style,
          'grid-row': row,
          'grid-column': column
        }
      }

      return style
    }
  }
})
</script>

<style lang="sass" scoped>
.card
  background-size: cover
  background-repeat: no-repeat
  background-position: center top
  min-height: 300px
  background-color: white
  padding: 15px
  color: #333

.action
  margin-top: auto

.button
  display: inline-block
  width: 100%
  height: 40px
  justify-content: center
  align-items: center
  background-color: #00aa46
  border: 0
  outline: 0
  border-radius: 20px
  cursor: pointer
  text-align: center
  font-size: 16px
  line-height: 40px
  color: white
</style>
