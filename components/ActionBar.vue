<template>
  <div class="action">
    <div
      class="qty-selector js-qty-selector"
      :data-product="id"
      data-category-lvl-1="0"
      data-category-lvl-3="0"
    >
      <button
        class="add js-qty-selector-minus"
        aria-label="Minska antalet"
        @click="qty = qty - 1"
      >
        <path
          class="minus-button"
          fill="none"
          fill-rule="evenodd"
          stroke="#FFF"
          d="M13.872 1.095H.128"
        ></path>
      </button>
      <input
        v-model="qty"
        class="js-qty-selector-input"
        type="number"
        min="0"
        max="999"
        data-max="999"
      />
      <button
        class="remove js-qty-selector-plus"
        aria-label="Öka antalet"
        @click="qty = qty + 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <g
            class="plus-button"
            fill="none"
            fill-rule="evenodd"
            stroke="#FFF"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 .5v11M11.5 6H.5"></path>
          </g>
        </svg>
      </button>
    </div>
    <v-btn
      tabindex="0"
      role="button"
      aria-pressed="false"
      :disabled="qty <= 0"
      @click="addToCart()"
    >
      <span>Lägg till</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      qty: 0
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

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.add-to-cart {
  display: block;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: white;
  cursor: pointer;
}
.qty-selector {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: #00aa46;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 3px;
}
.add,
.remove {
  display: flex;
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  border-radius: 50%;
  cursor: pointer;
}
.add:focus,
.remove:focus {
  border: 1px solid white;
}
.add {
  background-color: rgba(0, 85, 55, 0.3);
}
.remove {
  background-color: #005537;
}
input {
  width: 34px;
  height: 32px;
  flex-grow: 1;
  color: white;
  text-align: center;
  font-size: 16px;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: white;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
