import Product from '~/types/Product'

export enum CardTypes {
  INFO = 'info',
  PRODUCT = 'product',
  AD = 'ad'
}

export type Card = ProductCard | AdCard | InfoCard

export interface ProductCard extends Partial<Product> {
  type: CardTypes.PRODUCT
}

interface AdCard {
  type: CardTypes.AD
  position: number
  image: string
  link: string
}

interface InfoCard {
  type: CardTypes.INFO
  image: string
  imageAltText: string
  header: string
  text: string
  link: string
  buttonText: string
  position?: number
  label?: string
  brand?: string
}
