import { Module } from 'vuex'
import qs from 'query-string'
import uniqBy from 'lodash.uniqby'
import Product from '~/types/Product'
import { CardTypes, ProductCard } from '~/types/Card'

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
    init({ dispatch, commit }) {
      const rcs = sessionStorage.getItem('rcs')
      commit('newRcs', rcs)
      commit('clearProducts')
      dispatch('loadFew')
    },
    async loadFew({ dispatch, commit }) {
      const products = await dispatch('fetch', {
        placements: 'home_page.2020_start_few'
      })
      commit('gotProducts', products)
    },
    async loadFull({ state, dispatch, commit }) {
      if (state.didShowMore) {
        return
      }
      const products = await dispatch('fetch', {
        placements: 'home_page.2020_start_full'
      })
      commit('gotProducts', products)
      commit('didShowMore')
    },
    async fetch({ rootState, state, commit }, { placements }) {
      const { config } = rootState
      commit('loading')
      const baseUrl = 'https://www.coop.se/ws/v2/coop/users/' + config.user
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
    isLoading(state: ProductsState): boolean {
      return state.loading
    },
    didShowMore(state: ProductsState) {
      return state.didShowMore
    },
    getProducts(state: ProductsState): Array<Product> {
      return state.recieved
    },
    getProductsAsCards(state: ProductsState): Array<ProductCard> {
      return state.recieved.map((p) => ({
        ...p,
        type: CardTypes.PRODUCT
      }))
    }
  }
}

export default productsModule
