<template>
  <div class="card" :style="{ 'background-image': 'url(' + card.image + ')' }">
    <div class="action">
      <a
        class="button"
        :href="card.link"
        :target="/\Wcoop\.se\W/.test(card.link) ? '_self' : '_blank'"
      >
        Handla nu
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ExtraCard } from '@/types/Card'

export default Vue.extend({
  props: {
    card: {
      type: Object as () => ExtraCard,
      required: true
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
  padding: 10px
  color: #333

.action
  margin-top: auto

.button
  display: inline-block
  width: 100%
  height: 34px
  justify-content: center
  align-items: center
  background-color: #00aa46
  border: 0
  outline: 0
  border-radius: 17px
  cursor: pointer
  text-align: center
  font-size: 16px
  line-height: 34px
  color: white
</style>
