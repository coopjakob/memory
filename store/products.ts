import { Module } from 'vuex'

interface ProductsState {
  recieved: any[]
  placement: string
}

const productsModule: Module<ProductsState, any> = {
  state() {
    return {
      recieved: [],
      placement: 'home_page.horizontal_recs1'
    }
  },
  actions: {
    async init({ dispatch, rootState, commit }) {
      const products = await dispatch('fetch', {
        rcs: rootState.rcs,
        placement: 'home_page.2020_start_few'
      })
      commit('gotProducts', products)
    },
    async loadMore({ dispatch, rootState, commit }) {
      const products = await dispatch('fetch', {
        rcs: rootState.rcs,
        placement: 'home_page.2020_start_full'
      })
      commit('gotProducts', products)
    },
    async fetch({ rootState }, { rcs, placement }) {
      const baseUrl = 'https://www.coop.se/ws/v2/coop/users/anonymous'
      const url = `${baseUrl}/products/recommend-segmented?placements=${placement}&fields=DEFAULT&storeId=${rootState.config.coopStore}&rrSessionId=${rootState.config.rrSessionId}&rcs=${rcs}`
      const response = await this['$axios'].$get(url)
      return response.placements[0].products
    }
  },
  mutations: {
    gotProducts(state, products) {
      state.recieved = products
    }
  },
  getters: {
    receivedProducts(state) {
      return state.recieved
    }
  }
}

export default productsModule
