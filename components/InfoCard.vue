<template>
  <v-alert border="bottom">
    I'm a card of type info named {{ product.name }}.<br />
    My sibling is
    {{ product.sibling.name }}
    <pre>{{ JSON.stringify(product.before, null, 4) }}</pre>
  </v-alert>
</template>

<script lang="ts">
import Vue from 'vue'
import Product from '~/types/Product'

export default Vue.extend({
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  }
})
</script>
