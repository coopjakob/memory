import Product from '~/types/Product'

export enum CardTypes {
  INFO,
  PRODUCT
}
interface Targets {
  category?: string
  product?: string
  label?: string
  manufacturer?: string
}

export default interface Card extends Partial<Product> {
  type: CardTypes
  before?: Targets
  sortKey: string
  sibling?: Product
}
