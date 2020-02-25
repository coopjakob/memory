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
    async fetch({commit, state, rootState}) {
      const url = `https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=${
        state.placement
      }&fields=DEFAULT&storeId=${
        rootState.coopStore
      }&rrSessionId=${
        rootState.rrSessionId
      }&rcs=${
        // Figure out what this is:
        'eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg'
      }`
      const response = await this['$axios'].$get(url)
      commit('gotProducts', response.placements[0].products)
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
