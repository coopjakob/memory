import { Module } from 'vuex'

interface ProductsState {
  rrSessionId: string
  user: string
  coopStore: string
  cartguid: string
}

const configModule: Module<ProductsState, any> = {
  state() {
    return {
      rrSessionId: 's109421930639200',
      user: 'a148649e-235a-4157-8df8-5b2aa424ea7d',
      coopStore: '016001',
      cartguid: '8050f27b-ce0b-49f8-b535-daa7f6faca1d',
      rcs:
        'eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg'
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
      return state.coopStore
    }
  }
}

export default configModule
