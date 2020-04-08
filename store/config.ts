import { Module } from 'vuex'
import { ConfigState } from '~/types/Config'
import event from '@/event'

const configModule: Module<ConfigState, any> = {
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
      if (config.user !== 'anonymous' && config.user !== 'anonymousb2b') {
        event('user-found')
        this['$axios'].setHeader('Authorization', `Bearer ${config.authToken}`)
      } else {
        event('anonymous')
      }
      commit('setConfig', config)
    }
  },
  mutations: {
    setConfig(state, config) {
      event('set-config')
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
