<template>
  <div class="action">
    <div
      class="add-to-cart m-cart-addition qty-selector js-qty-selector"
      :class="{ 'has-value': qty > 0 }"
      :data-product="id"
      :data-category-lvl-1="categories[0].code"
      :data-category-lvl-3="categories[2].code"
    >
      <button
        class="remove js-qty-selector-minus"
        :disabled="qty === 0"
        aria-label="Minska antalet"
        @click="qty = qty - 1"
      />
      <input
        class="js-qty-selector-input"
        type="number"
        :value="qty"
        min="0"
        max="999"
        data-max="999"
      />
      <button
        class="add js-qty-selector-plus"
        aria-label="Öka antalet"
        @click="qty = qty + 1"
      />
      <button
        class="buy-mobile js-qty-selector-plus"
        aria-label="Lägg till i varukorgen"
        :disabled="qty <= 0"
        @click="qty = 1"
      >
        Köp
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    initQty: {
      type: Number,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      qty: this.initQty
    }
  },
  watch: {
    qty(newValue) {
      if (newValue < 0) {
        this.qty = 0
      }
    }
  },
  methods: {
    addToCart() {
      const toAdd = {
        id: this.id,
        qty: this.qty
      }
      this.$store.dispatch('cart/add', toAdd)
      this.qty = 0
    }
  }
})
</script>

<style lang="sass" scoped>
.action
  display: flex
  justify-content: center
  align-items: stretch

.add-to-cart
  display: flex
  height: 40px
  justify-content: center
  align-items: center
  flex-grow: 1
  color: white
  cursor: pointer

.qty-selector
  display: flex
  justify-content: space-between
  flex-grow: 1
  padding: 3px
  border-radius: 20px
  background-color: #00aa46
  color: white

  button:disabled
    background-color: rgba(0,85,55,.3)

  .buy-mobile
    width: 100%
    height: 34px
    justify-content: center
    align-items: center
    background-color: #00aa46
    border: 0
    outline: 0
    border-radius: 17px
    cursor: pointer
    text-align: center
    font-size: 16px
    color: white

  .add, .remove
    display: none
    width: 34px
    height: 34px
    background-color: #005537
    background-repeat: no-repeat
    background-position: center
    background-size: 10px 10px
    justify-content: center
    align-items: center
    border: 0
    outline: 0
    border-radius: 50%
    cursor: pointer

  .add
    background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMSAxMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PGcgaWQ9IktvbXBvbmVudGJpYmxpb3RlayI+PGcgaWQ9Il94NUJfS8OWUEtOQVBQX3g1RF8tX3gyRl8tU8O2ay1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTE0KSI+PGcgaWQ9Il94NUJfSUtPTl94NURfLV94MkJfIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSAxNCkiPjxwYXRoIGlkPSJMaW5lLTYiIGNsYXNzPSJzdDAiIGQ9Ik01LjUuNXYxMCIvPjxwYXRoIGlkPSJMaW5lLTZfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMC41IDUuNUguNSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')

  .remove
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTE5IDkuNUgxIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiLz48L3N2Zz4=')

  .add:focus, .remove:focus
    border: none;
    background-color: #001b11;

  input
    display: none
    width: 34px
    height: 32px
    flex-grow: 1
    text-align: center
    font-size: 16px
    color: white
    background: transparent
    border: none
    outline: none

    &::placeholder  /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white
      opacity: 1 /* Firefox */

    &:-ms-input-placeholder /* Internet Explorer 10-11 */
      color: white

    &::-ms-input-placeholder /* Microsoft Edge */
      color: white

  .is-delayed .remove
    cursor: wait!important

  @media (min-width: 767px)

    .add, .remove
      display: flex

    input
      display: block

    .buy-mobile
      display: none

  &.has-value
    background-color: #f5f5f5
    color: #00aa46

    .buy-mobile
      display: none

    .add
      display: flex
      background-color: white
      background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMSAxMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDBhYTQ2O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PGcgaWQ9IktvbXBvbmVudGJpYmxpb3RlayI+PGcgaWQ9Il94NUJfS8OWUEtOQVBQX3g1RF8tX3gyRl8tU8O2ay1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTE0KSI+PGcgaWQ9Il94NUJfSUtPTl94NURfLV94MkJfIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSAxNCkiPjxwYXRoIGlkPSJMaW5lLTYiIGNsYXNzPSJzdDAiIGQ9Ik01LjUuNXYxMCIvPjxwYXRoIGlkPSJMaW5lLTZfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMC41IDUuNUguNSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')

    .remove
      display: flex
      background-color: white
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTE5IDkuNUgxIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhNDYiLz48L3N2Zz4=')

    input
      display: block
      color: #00aa46

input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0
</style>
