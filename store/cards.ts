import { Module } from 'vuex'
import { CardTypes, ExtraCard, Cards } from '../types/Card'
import Product from '~/types/Product'
import { event } from '@/event'

interface CardsState {
  extra: Array<ExtraCard>
}

const generateSkeletons = (n: number) =>
  Array(n).fill({
    type: CardTypes.SKELETON
  })

const cardsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      extra: [
        {
          name: 'lottal',
          type: CardTypes.AD,
          position: 4,
          exclude: {
            b2bUser: true
          },
          image: 'https://coop-static.netlify.app/lottal.jpg',
          link: 'https://www.coop.se/handla/lottal',
          buttonText: 'Handla nu'
        },
        {
          name: 'recept',
          type: CardTypes.AD,
          position: 9,
          include: {
            sessionPostCode: '',
            storeName: 'STOCKHOLM'
          },
          exclude: {
            b2bUser: true
          },
          image: 'https://coop-static.netlify.app/recept.jpg',
          link: 'https://www.coop.se/handla/kopklara-recept',
          buttonText: 'Recept'
        },
        {
          name: 'recept',
          type: CardTypes.AD,
          position: 9,
          exclude: {
            storeName: 'STOCKHOLM',
            b2bUser: true
          },
          image: 'https://coop-static.netlify.app/recept.jpg',
          link: 'https://www.coop.se/handla/kopklara-recept',
          buttonText: 'Recept'
        },
        {
          name: 'gardsbutiken',
          type: CardTypes.AD,
          position: 9,
          include: {
            storeName: 'STOCKHOLM'
          },
          exclude: {
            sessionPostCode: '',
            b2bUser: true
          },
          image:
            'https://www.coop.se/medias/330x704-ny-grid.jpg?context=bWFzdGVyfHJvb3R8OTkxMjl8aW1hZ2UvanBlZ3xoZTcvaDFkLzg5MzQxNDUxOTYwNjIvMzMweDcwNF9ueSBncmlkLmpwZ3wyZmEwMzJhZTc2ZDFlOTQzZGNlMmU4YTRjOTlkZTQ5NTQxMWIyMjVlZjY1NWYwY2Y4ZWY3Y2Q0OWIyZTFjNGRh',
          link: 'https://www.coop.se/handla/gardsbutiken',
          buttonText: 'Gårdsbutiken'
        },
        {
          name: 'matkassar',
          type: CardTypes.AD,
          exclude: {
            b2bUser: true
          },
          position: 22,
          image: 'https://coop-static.netlify.app/matkassar.jpg',
          link: 'https://www.coop.se/handla/matkasse',
          buttonText: 'Matkassar'
        }
      ]
    }
  },
  getters: {
    getAllCards(state, getters, rootState, rootGetters): Cards {
      const { config } = window.ACC
      let cards = rootGetters['products/getProductsAsCards']

      if (!rootGetters['products/isInited']) {
        cards = [...cards, ...generateSkeletons(30)]
      }

      const unusedCards: Array<ExtraCard> = []
      const used: string[] = []
      state.extra.forEach((card) => {
        if (card.column && !card.position) {
          event('rowcol-only')
          cards.splice(0, 0, card)
          return
        }
        if (card.include) {
          event('include-audience', card)
          for (const [key, value] of Object.entries(card.include)) {
            if (config[key] !== value) return
          }
        }
        if (card.exclude) {
          event('exclude-audience', card)
          for (const [key, value] of Object.entries(card.exclude)) {
            if (config[key] === value) return
          }
        }
        if (card.position) {
          event('position-card')
          cards.splice(card.position - 1, 0, card)
          return
        }
        if (card.label) {
          event('label-card')
          const product = cards.find(
            (product: Product) =>
              product.productLabels?.find(
                (label) => card.label === label.code
              ) && !used.includes(product.code)
          )
          if (product) {
            const index = cards.indexOf(product)
            used.push(product.code)
            cards[index] = [card, product]
            // cards.splice(index, 0, card)
            return
          }
        }
        if (card.brand) {
          event('brand-card')
          const product = cards.find(
            (product: Product) =>
              product.manufacturer === card.brand &&
              !used.includes(product.code)
          )
          if (product) {
            const index = cards.indexOf(product)
            used.push(product.code)
            cards[index] = [card, product]
            // cards.splice(index, 0, card)
            return
          }
        }
        unusedCards.push(card)
      })
      return [cards, unusedCards]
    },
    getCards(state, getters) {
      event('get-cards')
      return getters.getAllCards[0]
    },
    getUnusedCards(state, getters) {
      event('unused-cards')
      return getters.getAllCards[1]
    }
  }
}

export default cardsModule
