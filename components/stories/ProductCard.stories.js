import { baseCard } from './baseCard'
import ProductCard from '@/components/ProductCard.vue'

export default {
  title: 'ProductCard',
  component: ProductCard
}

const generateCard = ({ name, card = {} } = {}) => {
  const output = () => ({
    components: { ProductCard },
    data() {
      return {
        card: {
          ...baseCard,
          ...card
        }
      }
    },
    template: `<product-card style="width: 175px; height: 350px;" :card="card" />`
  })
  output.story = {
    name
  }
  return output
}

export const card = generateCard({ name: 'Basic' })
export const fromSweden = generateCard({
  name: 'from Sweden',
  card: {
    fromSweden: true
  }
})
export const withDeposit = generateCard({
  name: 'with Deposit',
  card: {
    depositPrice: {
      value: '2kr',
      formattedValue: '2kr'
    }
  }
})
export const withLabels = generateCard({
  name: 'with Labels',
  card: {
    productLabels: [
      {
        code: 'NYCKELHALET',
        icon:
          'https://res.cloudinary.com/coopsverige/image/upload/cooponline/produktmarkning/NyckelhalLogo.svg',
        priority: 10
      },
      {
        code: 'KRAV0U0MARK',
        icon:
          'https://res.cloudinary.com/coopsverige/image/upload/cooponline/produktmarkning/KRAVLogo.svg',
        priority: 10
      },
      {
        code: 'alltidlagtpris',
        icon:
          'https://res.cloudinary.com/coopsverige/image/upload/cooponline/alltid-bra-pris-200x200.png',
        priority: 10
      }
    ]
  }
})

export const withConsumerInfoText = generateCard({
  name: 'with Consumer Information Text',
  card: {
    consumerInformationText: ["It's vegan!"]
  }
})
