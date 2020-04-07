<template>
  <button class="coopknapp" :disabled="disabled" @click="$emit('click')">
    {{ cta }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    cta: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="sass" scoped>
.coopknapp
  display: block
  width: 190px
  margin: 10px auto
  padding: 10px
  color: white
  cursor: pointer
  height: 40px
  border-radius: 20px
  background-color: #00aa46
  font-size: 16px
  border: 0
</style>
