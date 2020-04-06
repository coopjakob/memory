import { Module } from 'vuex'
import qs from 'query-string'
import uniqBy from 'lodash.uniqby'
import Product from '~/types/Product'
import { CardTypes, ProductCard } from '~/types/Card'
import event from '@/event'

const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

interface ProductsState {
  recieved: Array<Product>
  rcs?: string
  didShowMore: boolean
  loading: boolean
  inited: boolean
}

const productsModule: Module<ProductsState, any> = {
  state(): ProductsState {
    return {
      recieved: [],
      rcs: undefined,
      didShowMore: false,
      loading: false,
      inited: false
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
      event('load-few')
      const products = await dispatch('fetch', {
        placements: 'home_page.2020_start_few'
      })
      commit('gotProducts', products)
    },
    async loadFull({ state, dispatch, commit }) {
      if (state.didShowMore) {
        event('full-exists')
        return
      }
      event('load-full')
      const products = await dispatch('fetch', {
        placements: 'home_page.2020_start_full'
      })
      commit('gotProducts', products)
      commit('didShowMore')
    },
    async fetch({ rootState, state, commit }, { placements }) {
      event('fetch-products')
      const { config } = rootState
      commit('loading')
      if (process.env.NODE_ENV === 'development') {
        await wait(3000)
      }
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
      event('set-rcs')
      sessionStorage.setItem('rcs', rcs)
      state.rcs = rcs
    },
    didShowMore(state: ProductsState) {
      state.didShowMore = true
    },
    clearProducts(state: ProductsState) {
      event('clear-products')
      state.recieved = []
    },
    gotProducts(state: ProductsState, products: Array<Product>) {
      event('remove-duplicates')
      state.recieved = uniqBy([...state.recieved, ...products], 'code')
      state.loading = false
      state.inited = true
    }
  },
  getters: {
    isLoading(state: ProductsState): boolean {
      return state.loading
    },
    isInited(state: ProductsState): boolean {
      return state.inited
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
