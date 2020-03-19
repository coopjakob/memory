import { Module } from 'vuex'
import { CardTypes, ExtraCard, Cards } from '../types/Card'
import Product from '~/types/Product'

interface CardsState {
  extra: Array<ExtraCard>
  columns: number
}

function findByLabel(
  extraCard,
  columns,
  cards,
  unavailable: Array<string> = []
) {
  const product = cards.find(
    (product: Product) =>
      product.productLabels?.find((label) => extraCard.label === label.code) &&
      !unavailable.includes(product.code)
  )
  if (product) {
    const index = cards.indexOf(product)
    console.log('hmm', product.name, (index + 1) % columns, index + 1, columns)
    if ((index + 1) % columns === 0) {
      console.log(`${product.name} was in the last column and was skipped`)
      unavailable.push(product.code)
      return findByLabel(extraCard, columns, cards, unavailable)
    }
    return { index, code: cards[index].code }
  }
}

const cardsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      columns: 0,
      extra: [
        {
          type: CardTypes.AD,
          position: 12,
          image: 'http://coop.se/img.webp',
          link: 'http://coop.se/product'
        },
        {
          type: CardTypes.AD,
          label: 'unknown',
          image: 'http://coop.se/img.webp',
          link: 'http://coop.se/unknown'
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
  mutations: {
    setColumns(state, columns: number) {
      state.columns = columns
    }
  },
  getters: {
    getAllCards(state, getters, rootState, rootGetters): Cards {
      const cards = rootGetters['products/getProductsAsCards']
      const unusedCards: Array<ExtraCard> = []
      const used: string[] = []
      state.extra.forEach((card) => {
        if (card.position) {
          cards.splice(card.position - 1, 0, card)
          return
        }
        if (card.label) {
          const product = findByLabel(card, state.columns, cards, used)
          if (product) {
            console.log('product')
            used.push(product.code)
            cards.splice(product.index, 0, card)
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
        unusedCards.push(card)
      })
      return [cards, unusedCards]
    },
    getCards(state, getters) {
      return getters.getAllCards[0]
    },
    getUnusedCards(state, getters) {
      return getters.getAllCards[1]
    }
  }
}

export default cardsModule
