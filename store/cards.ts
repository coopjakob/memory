import { Module } from 'vuex'
import { CardTypes, ExtraCard, Cards } from '../types/Card'
import Product from '~/types/Product'
import event from '@/event'

interface CardsState {
  extra: Array<ExtraCard>
}

const cardsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      extra: [
        {
          type: CardTypes.AD,
          position: 1,
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/v1585574793/cooponline/2020/480x760.jpg',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.AD,
          position: 14,
          row: 2,
          column: 3,
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/v1585574785/cooponline/2020/330x704_ny_grid.jpg',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.AD,
          position: 21,
          row: 3,
          column: 'last',
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/v1585574777/cooponline/2020/Coop_kategoribanners5.jpg',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.INFO,
          brand: 'Änglamark',
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/cooponline/produktmarkning/NyckelhalLogo.svg',
          imageAltText: '',
          buttonText: 'Mer info',
          header: 'Änglamark',
          text: `Änglamark är vårt varumärke. Smod tempor incididunt ut labore et dol.
            Magna aliqua. Ut enim ad minim veniam`,
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.INFO,
          label: 'KRAV0U0MARK',
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/cooponline/alltid-bra-pris-200x200.png',
          imageAltText: '',
          buttonText: 'Krav på Coop',
          header: 'Kravmärkt',
          text:
            'Ekologiskt betyder att det är dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.INFO,
          row: 3,
          column: -3,
          image:
            'https://res.cloudinary.com/coopsverige/image/upload/v1576163066/cooponline/G%C3%A5rdsbutiken/landingpage-recommended-producers/syltkrukan-type4.jpg',
          imageAltText: '',
          buttonText: 'Gårdsbutiken',
          header: 'Handla lokalt',
          text:
            'I gårdsbutiken finns lokala varo rdolor sit amet, consectetur adipiscing elit, sed do et dolore magna aliqua. Ut enim ad minim veniam',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.AD,
          image: 'https://source.unsplash.com/random/230x460/?food',
          link: 'http://example.com/product'
        },
        {
          type: CardTypes.AD,
          image: 'https://source.unsplash.com/random/230x460/?dinner',
          link: 'http://coop.se/product'
        }
      ]
    }
  },
  getters: {
    getAllCards(state, getters, rootState, rootGetters): Cards {
      const cards = rootGetters['products/getProductsAsCards']
      const unusedCards: Array<ExtraCard> = []
      const used: string[] = []
      state.extra.forEach((card) => {
        if (card.column && !card.position) {
          event('grid-position')
          cards.splice(0, 0, card)
          return
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
