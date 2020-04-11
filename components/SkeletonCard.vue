<template>
  <div class="card">
    <div class="image" />
    <div class="line" />
    <div class="line" />
    <div class="button" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="sass" scoped>
.card
  background-color: white
  padding: 15px
  color: #333

  div
    background-color: #F4F4F4;
    width: 100%

.image
  padding-top: 100%
  position: relative
  margin-bottom: 10px

.line
  height: 16px
  margin-top: 12px

.button
  height: 40px
  margin-top: 40px
  border-radius: 20px
</style>
