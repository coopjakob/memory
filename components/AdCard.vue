<template>
  <v-alert border="bottom">
    I'm a card of type ad with a link {{ card.link }}.
  </v-alert>
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
