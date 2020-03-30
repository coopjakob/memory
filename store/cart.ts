export const actions = {
  async fetchCart({ rootState, commit }) {
    const { config } = rootState

    let axiosConfig = {}
    if (config.user !== 'anonymous') {
      axiosConfig = {
        headers: {
          Authorization: `Bearer ${config.authToken}`
        }
      }
    }

    await this['$axios']
      .get(
        `https://www.coop.se/ws/v2/coop/users/${config.user}/carts/${config.cartguid}?fields=DEFAULT`,
        axiosConfig
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
  setCart(state, payload) {
    // `state = payload` doesn't work
    state.response = payload
  }
}
