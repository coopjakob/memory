<template>
  <div class="card">
    <div class="top">
      <div class="image" />
      <div class="line" />
      <div class="line" />
    </div>
    <div class="bottom">
      <div class="short-line" />
      <div class="button" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.card {
  padding: 15px;
  background-color: white;
  color: #333;
  display: flex;
  flex-direction: column;
}
.top {
  flex-grow: 1;
}

.image {
  padding-top: 100%;
  position: relative;
  background-color: #f4f4f4;
}

.line {
  height: 21px;
  margin-top: 14px;
  background-color: #f4f4f4;
}

.short-line {
  width: 50%;
  height: 21px;
  margin-top: 14px;
  background-color: #f4f4f4;
}

.button {
  margin-top: 14px;
  height: 40px;
  background-color: #f4f4f4;
  border-radius: 20px;
}
</style>
