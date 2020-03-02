import { Module } from 'vuex'
import pick from 'lodash.pick'

interface ProductsState {
  [key: string]: string
}

const configModule: Module<ProductsState, any> = {
  state() {
    return {}
  },
  actions: {
    init({ commit }, fullConfig) {
      const config = pick(fullConfig, [
        'rrSessionId',
        'user',
        'coopStore',
        'cartguid'
      ])
      commit('setConfig', config)
    }
  },
  mutations: {
    setConfig(state, config) {
      Object.entries(config).forEach(([key, value]: [string, any]) => {
        state[key] = value
      })
    }
  },
  getters: {
    getCoopStore(state) {
      return state.coopStore
    },
    getUser(state) {
      return state.user
    },
    getCartGuid(state) {
      return state.cartguid
    }
  }
}

export default configModule
