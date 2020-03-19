import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: {
      $emit: Function
    }
    $chat: Function
  }
}
