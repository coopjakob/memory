import { CartState } from '~/types/Cart'

export const actions = {
  async fetchCart({ rootState, commit }) {
    const { config } = rootState

    try {
      const { data } = await this['$axios'].get(
        `https://www.coop.se/ws/v2/coop/users/${config.user}/carts/${config.cartguid}?fields=DEFAULT`
      )
      commit('setCart', data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }

    await this['$axios']
      .get(
        `https://www.coop.se/ws/v2/coop/users/${config.user}/carts/${config.cartguid}?fields=DEFAULT`
      )
      .then((response) => {
        commit('setCart', response.data)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }
}

export const mutations = {
  setCart(state, payload: CartState) {
    state.response = payload
  }
}
