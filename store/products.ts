import { Module } from 'vuex'
import qs from 'query-string'
import uniqBy from 'lodash.uniqby'
import isMobile from 'is-mobile'
import Product from '../types/Product'

interface ProductsState {
  recieved: Array<Product>
  rcs?: string
  didShowMore: boolean
  loading: boolean
}

const productsModule: Module<ProductsState, any> = {
  state(): ProductsState {
    return {
      recieved: [],
      rcs: undefined,
      didShowMore: false,
      loading: false
    }
  },
  actions: {
    async init({ dispatch, commit }) {
      const rcs = sessionStorage.getItem('rcs')
      commit('newRcs', rcs)
      commit('clearProducts')
      const placements = isMobile()
        ? 'home_page.2020_start_few'
        : 'home_page.2020_start_full'
      const products = await dispatch('fetch', {
        placements
      })
      commit('gotProducts', products)
    },
    async loadMore({ dispatch, commit }) {
      const products = await dispatch('fetch', {
        placements: 'home_page.2020_start_full'
      })
      commit('gotProducts', products)
      commit('didShowMore')
    },
    async fetch({ rootState, state, commit }, { placements }) {
      const { config } = rootState
      commit('loading')
      const baseUrl = 'https://www.coop.se/ws/v2/coop/users/anonymous'
      const query = {
        placements,
        fields: 'DEFAULT',
        storeId: config.coopStore,
        rrSessionId: config.rrSessionId,
        rcs: state.rcs
      }
      const queryString = qs.stringify(query)
      const url = `${baseUrl}/products/recommend-segmented?${queryString}`
      const response = await this['$axios'].$get(url)
      const { products, rcs } = response.placements[0]
      commit('newRcs', rcs)
      return products
    }
  },
  mutations: {
    loading(state, status = true) {
      state.loading = status
    },
    newRcs(state: ProductsState, rcs) {
      if (!rcs) {
        return
      }
      sessionStorage.setItem('rcs', rcs)
      state.rcs = rcs
    },
    didShowMore(state: ProductsState) {
      state.didShowMore = true
    },
    clearProducts(state: ProductsState) {
      state.recieved = []
    },
    gotProducts(state: ProductsState, products: Array<Product>) {
      state.recieved = uniqBy([...state.recieved, ...products], 'code')
      state.loading = false
    }
  },
  getters: {
    isLoading(state: ProductsState) {
      return state.loading
    },
    receivedProducts(state: ProductsState) {
      return state.recieved
    }
  }
}

export default productsModule
