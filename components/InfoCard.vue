<template>
  <div class="card">
    <article>
      <figure>
        <img :src="card.image" :alt="card.imageAltText" />
      </figure>
      <header>{{ card.header }}</header>
      <p>{{ card.text }}</p>

      <p>
        <a class="pointer" :href="card.link">
          {{ card.buttonText }}

          <span class="icon-pointer">
            <svg
              width="12"
              height="12"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8.5H-0.5V9.5H0V8.5ZM0 9.5H17V8.5H0V9.5Z"
                fill="#333333"
              />
              <path d="M10.5 2.5L17 9L10.5 15.5" stroke="#333333" />
            </svg>
          </span>
        </a>
      </p>
    </article>
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
  background-color: white
  padding: 10px
  color: #333

  @media (min-width: 425px)
    padding: 15px

figure
  margin: 0 //reset
  position: relative
  width: 100%
  padding-top: 100%

  img
    position: absolute
    max-width: 80%
    max-height: 150px
    bottom: 0

header
  margin: 10px 0 3px 0
  font-size: 16px

p
  font-size: 12px
  margin: 7px 0 3px 0

.pointer
  color: #00aa46

.icon-pointer
  vertical-align: middle
  line-height: 1
</style>
