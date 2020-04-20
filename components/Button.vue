<template>
  <button :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  display: block;
  width: 190px;
  margin: 10px auto;
  padding: 10px;
  color: white;
  cursor: pointer;
  height: 40px;
  border-radius: 20px;
  background-color: #00aa46;
  font-size: 16px;
  border: 0;
}

button:disabled,
button[disabled] {
  cursor: not-allowed;
  background-color: #477359;
  color: white;
}
</style>
