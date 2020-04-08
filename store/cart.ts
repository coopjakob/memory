import { CartState } from '~/types/Cart'
import event from '@/event'

export const state = () => ({
  response: {
    entries: [
      {
        product: {
          code: ''
        },
        quantity: 0
      }
    ]
  }
})

export const actions = {
  async fetchCart({ commit }) {
    const config = window.ACC.config

    try {
      event('fetch-cart')
      let axiosConfig = {}
      if (config.user !== 'anonymous' && config.user !== 'anonymousb2b') {
        axiosConfig = {
          headers: { Authorization: `Bearer ${config.authToken}` }
        }
      }
      const { data } = await this['$axios'].$get(
        `https://www.coop.se/ws/v2/coop/users/${config.user}/carts/${config.cartguid}?fields=DEFAULT`,
        axiosConfig
      )
      commit('setCart', data)
    } catch (error) {
      event('cart-error')
    }
  }
}

export const mutations = {
  setCart(state, payload: CartState) {
    event('set-cart')
    state.response = payload
  }
}
