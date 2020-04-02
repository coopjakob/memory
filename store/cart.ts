import { CartState } from '~/types/Cart'
import event from '@/event'

export const actions = {
  async fetchCart({ rootState, commit }) {
    const { config } = rootState

    try {
      event('fetch-cart')
      const { data } = await this['$axios'].get(
        `https://www.coop.se/ws/v2/coop/users/${config.user}/carts/${config.cartguid}?fields=DEFAULT`
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
