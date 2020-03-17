import { Module } from 'vuex'
import { CardTypes, ExtraCard, Cards } from '../types/Card'
import Product from '~/types/Product'

interface CardsState {
  extra: Array<ExtraCard>
}

const cardsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      extra: [
        {
          type: CardTypes.AD,
          position: 12,
          image: 'http://coop.se/img.webp',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.INFO,
          label: 'KRAV0U0MARK',
          image: 'http://coop.se/img.webp',
          imageAltText: '',
          buttonText: '',
          header: 'Label: Kravmärkt',
          text: 'Ekologiskt betyder att det är...',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.INFO,
          brand: 'Änglamark',
          image: 'http://coop.se/img.webp',
          imageAltText: '',
          buttonText: 'Mer info',
          header: 'Brand: Änglamark',
          text: 'Änglamark är vårt varumärke...',
          link: 'http://coop.se/product'
        }
      ]
    }
  },
  getters: {
    getCards(state, getters, rootState, rootGetters): Cards {
      const cards = rootGetters['products/getProductsAsCards']
      const used: string[] = []
      state.extra.forEach((card) => {
        if (card.position) {
          cards.splice(card.position - 1, 0, card)
          return
        }
        if (card.label) {
          const product = cards.find(
            (product: Product) =>
              product.productLabels?.find(
                (label) => card.label === label.code
              ) && !used.includes(product.code)
          )
          if (product) {
            const index = cards.indexOf(product)
            used.push(product.code)
            cards.splice(index, 0, card)
            return
          }
        }
        if (card.brand) {
          const product = cards.find(
            (product: Product) =>
              product.manufacturer === card.brand &&
              !used.includes(product.code)
          )
          if (product) {
            const index = cards.indexOf(product)
            used.push(product.code)
            cards.splice(index, 0, card)
            return
          }
        }
        cards.push(card)
      })
      return cards
    }
  }
}

export default cardsModule
