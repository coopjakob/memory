import { Module } from 'vuex'
import { CardTypes, ExtraCard, Cards } from '../types/Card'
import Product from '~/types/Product'
import event from '@/event'

interface CardsState {
  extra: Array<ExtraCard>
}

const generateSkeltons = (n: number) =>
  Array(n).fill({
    type: CardTypes.SKELETON
  })

const cardsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      extra: [
        {
          type: CardTypes.AD,
          position: 1,
          include: {
            user: 'anonymous'
          },
          image:
            'https://coop-static.netlify.com/SFC0864_Dumle_easter_330x704px.jpg',
          link: 'https://www.coop.se/handla/search?text=dumle'
        },
        {
          type: CardTypes.AD,
          position: 1,
          include: {
            user: 'anonymousb2b'
          },
          image: 'https://coop-static.netlify.com/anglamark.jpg',
          link: 'https://www.coop.se/handla/anglamark',
          buttonText: 'Änglamark'
        },
        {
          type: CardTypes.AD,
          position: 2,
          include: {
            storeName: 'STOCKHOLM'
          },
          exclude: {
            sessionPostCode: ''
          },
          image: 'https://source.unsplash.com/random/230x460/?stockholm',
          link: 'http://coop.se/product',
          buttonText: 'Stockholm'
        },
        {
          type: CardTypes.AD,
          include: {
            user: 'anonymous'
          },
          position: 8,
          row: 2,
          column: 3,
          image: 'https://coop-static.netlify.com/sa-funkar-det.jpg',
          link: 'https://www.coop.se/handla/sa-funkar-det',
          buttonText: 'Så funkar det'
        },
        {
          type: CardTypes.AD,
          include: {
            b2bUser: false
          },
          position: 15,
          row: 3,
          column: 'last',
          image: 'https://coop-static.netlify.com/matkassar.jpg',
          link: 'https://www.coop.se/handla/matkasse',
          buttonText: 'Matkassar'
        },
        {
          type: CardTypes.AD,
          image:
            'https://coop-static.netlify.com/Gridbanner_Valio_Desktop330x704_Vanilj.jpg',
          link: 'https://www.coop.se/handla/search?text=valio'
        },
        {
          type: CardTypes.AD,
          image: 'https://coop-static.netlify.com/poang.jpg',
          link: 'https://www.coop.se/medlemsinfo',
          buttonText: 'Läs mer'
        },
        {
          type: CardTypes.AD,
          image: 'https://coop-static.netlify.com/Gridbanner_OLW_330x704.jpg',
          link: 'https://www.coop.se/handla/search?text=OLW'
        }
      ]
    }
  },
  getters: {
    getAllCards(state, getters, rootState, rootGetters): Cards {
      const { config } = window.ACC
      let cards = rootGetters['products/getProductsAsCards']

      if (!rootGetters['products/isInited']) {
        cards = [
          ...rootGetters['products/getProductsAsCards'],
          ...generateSkeltons(30)
        ]
      }

      const unusedCards: Array<ExtraCard> = []
      const used: string[] = []
      state.extra.forEach((card) => {
        if (card.column && !card.position) {
          event('grid-position')
          cards.splice(0, 0, card)
          return
        }
        if (card.include) {
          for (const [key, value] of Object.entries(card.include)) {
            if (config[key] !== value) return
          }
        }
        if (card.exclude) {
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
