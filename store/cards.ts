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
          name: 'sa-funkar-det',
          type: CardTypes.AD,
          include: {
            user: 'anonymous'
          },
          position: 4,
          image: 'https://coop-static.netlify.com/sa-funkar-det.jpg',
          link: 'https://www.coop.se/handla/sa-funkar-det',
          buttonText: 'Så funkar det'
        },
        {
          name: 'gardsbutiken',
          type: CardTypes.AD,
          position: 9,
          include: {
            storeName: 'STOCKHOLM'
          },
          exclude: {
            sessionPostCode: ''
          },
          image:
            'https://www.coop.se/medias/330x704-ny-grid.jpg?context=bWFzdGVyfHJvb3R8OTkxMjl8aW1hZ2UvanBlZ3xoZTcvaDFkLzg5MzQxNDUxOTYwNjIvMzMweDcwNF9ueSBncmlkLmpwZ3wyZmEwMzJhZTc2ZDFlOTQzZGNlMmU4YTRjOTlkZTQ5NTQxMWIyMjVlZjY1NWYwY2Y4ZWY3Y2Q0OWIyZTFjNGRh',
          link: 'https://www.coop.se/handla/gardsbutiken',
          buttonText: 'Gårdsbutiken'
        },
        {
          name: 'recept',
          type: CardTypes.AD,
          position: 9,
          include: {
            sessionPostCode: '',
            storeName: 'STOCKHOLM'
          },
          image: 'https://coop-static.netlify.com/recept.jpg',
          link: 'https://www.coop.se/handla/kopklara-recept',
          buttonText: 'Recept'
        },
        {
          name: 'recept',
          type: CardTypes.AD,
          position: 9,
          exclude: {
            storeName: 'STOCKHOLM'
          },
          image: 'https://coop-static.netlify.com/recept.jpg',
          link: 'https://www.coop.se/handla/kopklara-recept',
          buttonText: 'Recept'
        },
        {
          name: 'anglamark',
          type: CardTypes.AD,
          include: {
            b2bUser: true
          },
          brand: 'Änglamark',
          image: 'https://coop-static.netlify.com/anglamark.jpg',
          link: 'https://www.coop.se/handla/anglamark',
          buttonText: 'Änglamark'
        },
        {
          name: 'valio',
          type: CardTypes.AD,
          include: {
            user: 'anonymous'
          },
          brand: 'Valio',
          image:
            'https://coop-static.netlify.com/Gridbanner_Valio_Desktop330x704_Vanilj.jpg',
          link: 'https://www.coop.se/handla/search?text=valio'
        },
        {
          name: 'olw',
          type: CardTypes.AD,
          include: {
            user: 'anonymous'
          },
          brand: 'OLW',
          image: 'https://coop-static.netlify.com/Gridbanner_OLW_330x704.jpg',
          link: 'https://www.coop.se/handla/search?text=OLW'
        },
        {
          name: 'matkassar',
          type: CardTypes.AD,
          include: {
            b2bUser: false
          },
          position: 22,
          image: 'https://coop-static.netlify.com/matkassar.jpg',
          link: 'https://www.coop.se/handla/matkasse',
          buttonText: 'Matkassar'
        },
        {
          name: 'poang',
          type: CardTypes.AD,
          image: 'https://coop-static.netlify.com/poang.jpg',
          link: 'https://www.coop.se/medlemsinfo',
          buttonText: 'Läs mer'
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
