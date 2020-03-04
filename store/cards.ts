import { Module } from 'vuex'
import Card, { CardTypes } from '../types/Card'
import Product from '~/types/Product'

interface CardsState {
  all: Array<Card>
  used: Array<string>
}

function clone(card) {
  return { ...card }
}

function addSortKey(card: Card) {
  card.sortKey = card.before ? `${card.code}_order1` : `${card.code}_order2`
  return card
}

function siblingsOnlyFactory(productCards) {
  const productIds = productCards.map((p) => p.code)
  return function siblingsOnly(card: Partial<Card>) {
    const product = card.before?.product
    if (product && productIds.includes(product)) {
      return true
    }
    const category = card.before?.category || card.before?.category
    if (category) {
      const sibling = productCards.find((product: Product) =>
        product.categories.find((_category) => category === _category.code)
      )
      if (sibling) {
        return true
      }
    }
    const label = card.before?.label || card.before?.label
    if (label) {
      const sibling = productCards.find((product: Product) => {
        return product.productLabels?.find((_label) => label === _label.code)
      })
      if (sibling) {
        return true
      }
    }
    const manufacturer = card.before?.manufacturer || card.before?.manufacturer
    if (manufacturer) {
      const sibling = productCards.find(
        (product: Product) => product.manufacturer === manufacturer
      )
      if (sibling) {
        return true
      }
    }
    return false
  }
}

function addSiblingFactory(products) {
  const used: Array<string> = []
  const findSiblingByNestedCode = (key, value) => {
    const card = products.find(
      (product: Product) =>
        product[key]?.find((item) => value === item.code) &&
        !used.includes(product.code)
    )
    return card
  }
  const handleSibling = (card, sibling) => {
    if (sibling) {
      card.sibling = sibling
      card.code = sibling.code
      used.push(sibling.code)
    }
  }
  const get = (card, selector) => card.before?.[selector]
  return function addSibling(card: Card) {
    const product = get(card, 'product')
    const category = get(card, 'category')
    const label = get(card, 'label')
    const manufacturer = get(card, 'manufacturer')
    if (product) {
      const sibling = products.find(
        (product: Product) => product.code === card.code
      )
      handleSibling(card, sibling)
    } else if (category) {
      const sibling = findSiblingByNestedCode('categories', category)
      handleSibling(card, sibling)
    } else if (label) {
      const sibling = findSiblingByNestedCode('productLabels', label)
      handleSibling(card, sibling)
    } else if (manufacturer) {
      const sibling = products.find(
        (product: Product) =>
          product.manufacturer === manufacturer && !used.includes(product.code)
      )
      handleSibling(card, sibling)
    }
    return card
  }
}

function bySortKey(a: Card, b: Card) {
  return a.sortKey > b.sortKey ? 1 : b.sortKey > a.sortKey ? -1 : 0
}

const productsModule: Module<CardsState, any> = {
  state(): CardsState {
    return {
      used: [],
      all: [
        ['manufacturer', 'Coop'],
        ['manufacturer', 'Oatly'],
        ['manufacturer', 'Coop']
        // ['product', '2317417300004'],
        // ['product', '4008429006296'],
        // ['product', '2317438900009'],
        // ['category', '32484'], // Frukt och grönt
        // ['category', '32484'], // Frukt och grönt
        // ['category', '32484'], // Frukt och grönt
        // ['category', '39033900'], // Vegetariskt
        // ['label', 'KRAV0U0MARK'], // Kravmärkt
        // ['label', 'KRAV0U0MARK'], // Kravmärkt
        // ['label', 'alltidlagtpris'] // Alltid lågt pris
      ].map(([key, value]) => {
        const card: Card = {
          name: 'Label',
          sortKey: '',
          type: CardTypes.INFO
        }
        card.before = {}
        if (key === 'product') {
          card.before.product = value
        }
        if (key === 'category') {
          card.before.category = value
        }
        if (key === 'label') {
          card.before.label = value
        }
        if (key === 'manufacturer') {
          card.before.manufacturer = value
        }
        return card
      })
    }
  },
  getters: {
    isLoading(state) {
      return state.all
    },
    getCards(state, getters, rootState, rootGetters) {
      const productCards = rootGetters['products/getProductsAsCards']
      const siblingsOnly = siblingsOnlyFactory(productCards)
      const addSibling = addSiblingFactory(productCards)
      return state.all
        .map(clone)
        .filter(siblingsOnly)
        .map(addSibling)
        .concat(productCards)
        .map(addSortKey)
        .sort(bySortKey)
    }
  }
}

export default productsModule
