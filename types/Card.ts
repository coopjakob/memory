import Product from '~/types/Product'

export enum CardTypes {
  INFO = 'info',
  PRODUCT = 'product',
  AD = 'ad'
}

export interface ProductCard extends Partial<Product> {
  type: CardTypes.PRODUCT
}

export type ExtraCard = AdCard | InfoCard

interface GenericCard {
  position?: number
  label?: string
  brand?: string
}

export interface AdCard extends GenericCard {
  type: CardTypes.AD
  image: string
  link: string
}

export interface InfoCard extends GenericCard {
  type: CardTypes.INFO
  image: string
  imageAltText: string
  header: string
  text: string
  link: string
  buttonText: string
}
