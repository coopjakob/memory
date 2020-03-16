import { Module } from 'vuex'

interface ProductsState {
  authToken: String
  cartguid: String
  coopStore: String
  rrSessionId: String
  user: String
}

const configModule: Module<ProductsState, any> = {
  state() {
    return {
      authToken: '',
      cartguid: '',
      coopStore: '',
      rrSessionId: '',
      user: ''
    }
  },
  actions: {
    init({ commit }, config) {
      if (config.user !== 'anonymous') {
        this['$axios'].setHeader('Authorization', `Bearer ${config.authToken}`)
      }
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
