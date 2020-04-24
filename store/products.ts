import Vue from 'vue'
import { Module } from 'vuex'
import qs from 'query-string'
import uniqBy from 'lodash.uniqby'
import Product from '~/types/Product'
import { CardTypes, ProductCard } from '~/types/Card'
import { event } from '@/event'

interface State {
  rcs?: string
}

interface GenericProducts {
  [key: string]: () => {
    recieved: Array<Product>
    didShowMore: boolean
    loading: boolean
    inited: boolean
    placement: string
    placementMore?: string
  }
}

type ProductsState = State | GenericProducts

const productsModule: Module<ProductsState, any> = {
  state(): ProductsState {
    return {}
  },
  actions: {
    init({ dispatch, commit }, { placement, placementMore, id }) {
      const rcs = sessionStorage.getItem('rcs')
      commit('newRcs', rcs)
      commit('init', { id, placement, placementMore })
      dispatch('loadFew', id)
    },
    async loadFew({ state, dispatch, commit }, id) {
      event('load-few')
      const products = await dispatch('fetch', {
        placements: state[id].placement,
        id
      })
      commit('gotProductsFew', { products, id })
    },
    async loadFull({ state, dispatch, commit }, id) {
      if (state[id].didShowMore) {
        event('full-exists')
        return
      }
      if (state[id].placementMore) {
        event('load-full')
        const products = await dispatch('fetch', {
          placements: state[id].placementMore,
          id
        })
        commit('gotProductsFull', { products, id })
      }
      commit('didShowMore', id)
    },
    async fetch({ state, commit }, { placements, id }) {
      event('fetch-products')
      const config = window.ACC.config
      commit('loading', id)
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

      let axiosConfig = {}
      if (config.user !== 'anonymous' && config.user !== 'anonymousb2b') {
        axiosConfig = {
          headers: { Authorization: `Bearer ${config.authToken}` }
        }
      }

      const response = await this['$axios'].$get(url, axiosConfig)
      const { products, rcs } = response.placements[0]
      commit('newRcs', rcs)
      return products
    }
  },
  mutations: {
    loading(state, id) {
      state[id].loading = true
    },
    newRcs(state: ProductsState, rcs) {
      if (!rcs) {
        return
      }
      event('set-rcs')
      sessionStorage.setItem('rcs', rcs)
      state.rcs = rcs
    },
    init(state: ProductsState, { placement, placementMore, id }) {
      Vue.set(state, id, {
        recieved: [],
        didShowMore: false,
        loading: false,
        inited: false,
        placement,
        placementMore
      })
    },
    didShowMore(state: ProductsState, id: string) {
      state[id].didShowMore = true
    },
    clearProducts(state: ProductsState, id: string) {
      event('clear-products')
      state[id].recieved = []
    },
    gotProductsFew(
      state: ProductsState,
      { id, products }: { products: Array<Product>; id: string }
    ) {
      event('remove-duplicates')
      state[id].recieved = uniqBy([...state[id].recieved, ...products], 'code')
      state[id].loading = false
      state[id].inited = true
    },
    gotProductsFull(
      state: ProductsState,
      { id, products }: { products: Array<Product>; id: string }
    ) {
      event('remove-duplicates')
      state[id].recieved = uniqBy([...products, ...state[id].recieved], 'code')
      state[id].loading = false
      state[id].inited = true
    }
  },
  getters: {
    isLoading(state: ProductsState): (id: string) => boolean {
      return (id) => state[id].loading
    },
    isInited(state: ProductsState): (id: string) => boolean {
      return (id) => state[id].inited
    },
    didShowMore(state: ProductsState): (id: string) => boolean {
      return (id) => state[id].didShowMore
    },
    getProducts(state: ProductsState): (id: string) => Array<Product> {
      return (id) => state[id].recieved
    },
    getProductsAsCards(
      state: ProductsState
    ): (id: string) => Array<ProductCard> {
      return (id) =>
        state[id].recieved.map((p) => ({
          ...p,
          type: CardTypes.PRODUCT
        }))
    }
  }
}

export default productsModule
