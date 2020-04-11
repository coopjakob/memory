<template>
  <div>
    <div ref="grid" class="grid">
      <template v-for="card in cards">
        <div
          v-if="didShowMore && Array.isArray(card)"
          :key="card.sortKey"
          class="buddy"
        >
          <component
            :is="components[_card.type]"
            v-for="_card in card"
            :key="_card.sortKey"
            ref="card"
            :card="_card"
          />
        </div>
        <component
          :is="components[card.type]"
          v-else
          :key="card.sortKey"
          ref="card"
          :card="card"
          :columns="columns"
        />
      </template>
      <component
        :is="components[card.type]"
        v-for="card in selectedFillers"
        :key="card.sortKey"
        :card="card"
        :columns="columns"
      />
    </div>

    <div v-if="!loading" class="show-more">
      <Coopknapp
        v-if="!didShowMore && isMobile"
        cta="Visa mer"
        :disabled="loading"
        @click="loadFull"
      />
    </div>
    <div v-else-if="isMobile" class="show-more loading">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductCard from './ProductCard.vue'
import InfoCard from './InfoCard.vue'
import AdCard from './AdCard.vue'
import SkeletonCard from './SkeletonCard.vue'
import Coopknapp from './Coopknapp.vue'
import { CardTypes } from '~/types/Card'

export default Vue.extend({
  components: {
    Coopknapp
  },
  props: {
    columns: {
      type: Number,
      required: true
    },
    loading: Boolean,
    didShowMore: Boolean,
    isMobile: Boolean,
    width: {
      type: Number,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    selectedFillers: {
      type: Array,
      required: true
    },
    emptySlots: {
      type: Number,
      required: true
    },
    loadFull: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      components: {
        [CardTypes.PRODUCT]: ProductCard,
        [CardTypes.SKELETON]: SkeletonCard,
        [CardTypes.INFO]: InfoCard,
        [CardTypes.AD]: AdCard
      }
    }
  }
})
</script>

<style>
/* creds to https://loading.io/css/ */

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #00aa46;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>

<style lang="sass" scoped>
.grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
  grid-auto-rows: minmax(350px, auto)
  grid-auto-flow: dense
  grid-gap: 2px

.card
  box-sizing: border-box
  display: flex
  flex-direction: column
  position: relative

.buddy
  grid-column-end: span 2
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
  grid-gap: 2px

.show-more
  width: 100%
  text-align: center
</style>
