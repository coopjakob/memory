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
$base-color: #F4F4F4
$shine-color: rgba(229,229,229,0.8)
$animation-duration: 2.0s

@mixin background-gradient
  animation: shine $animation-duration infinite ease-out
  background-image: linear-gradient(90deg, $base-color 0px, $shine-color 40px, $base-color 80px)
  background-size: 600px

.card
  background-color: white
  min-height: 300px
  padding: 15px
  color: #333

.image
  width: 100%
  padding-top: 100%
  position: relative
  background-color: #ccc
  border-radius: 25%
  margin-bottom: 10px
  @include background-gradient

.line
  width: 100%
  height: 16px
  margin-top: 12px
  border-radius: 7px
  @include background-gradient

.button
  width: 100%
  height: 40px
  margin-top: 40px
  border-radius: 20px
  @include background-gradient


@keyframes shine
  0%
    background-position: -100px

  40%, 100%
    background-position: 140px
</style>
