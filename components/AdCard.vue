<template>
  <v-alert border="bottom">
    I'm a card of type ad with a link {{ card.name }}.
  </v-alert>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from '~/types/Card'

export default Vue.extend({
  props: {
    card: {
      type: Object as () => Card,
      required: true
    }
  }
})
</script>
