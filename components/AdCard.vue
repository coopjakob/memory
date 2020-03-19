<template>
  <div class="card">
    I'm a card of type ad with a link {{ card.link }}. test test test
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ExtraCard } from '~/types/Card'

export default Vue.extend({
  props: {
    card: {
      type: Object as () => ExtraCard,
      required: true
    }
  }
})
</script>
