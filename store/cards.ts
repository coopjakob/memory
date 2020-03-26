import { CardTypes, ExtraCard, Cards } from '~/types/Card'
import Product from '~/types/Product'

export const state = () => ({
  extra: [
    {
      type: CardTypes.AD,
      position: 1,
      image: 'https://source.unsplash.com/random/230x460/?dinner',
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
      position: 12,
      image: 'https://source.unsplash.com/random/230x460/?food',
      link: 'http://example.com/product'
    }
  ]
})

export const getters = {
  getAllCards(state, _getters, _rootState, rootGetters): Cards {
    const cards = rootGetters['products/getProductsAsCards']
    const unusedCards: Array<ExtraCard> = []
    const used: string[] = []
    state.extra.forEach((card) => {
      if (card.position) {
        cards.splice(card.position - 1, 0, card)
        return
      }
      if (card.label) {
        const product = cards.find(
          (product: Product) =>
            product.productLabels?.find((label) => card.label === label.code) &&
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
      if (card.brand) {
        const product = cards.find(
          (product: Product) =>
            product.manufacturer === card.brand && !used.includes(product.code)
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
  getCards(_state, getters) {
    return getters.getAllCards[0]
  },
  getUnusedCards(_state, getters) {
    return getters.getAllCards[1]
  }
}
