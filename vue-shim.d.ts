import Vue from 'vue'
import { ConfigState } from '~/types/Config'

declare global {
  interface Window {
    ACC: {
      config: ConfigState
    }
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $bus: {
      $emit: Function
    }
  }
}
