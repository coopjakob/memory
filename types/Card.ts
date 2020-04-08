import Product from '~/types/Product'
import { ConfigState } from '~/types/Config'

export enum CardTypes {
  INFO = 'info',
  PRODUCT = 'product',
  AD = 'ad',
  SKELETON = 'skeleton'
}

export interface ProductCard extends Product {
  type: CardTypes.PRODUCT
}

export type Cards = Array<ProductCard | ExtraCard>

export type ExtraCard = AdCard | InfoCard | SkeletonCard

interface GenericExtraCard {
  position?: number
  column?: number | 'last'
  row?: number
  label?: string
  brand?: string
  include?: ConfigState
  exclude?: ConfigState
}

interface SkeletonCard extends GenericExtraCard {
  type: CardTypes.SKELETON
}

export interface AdCard extends GenericExtraCard {
  type: CardTypes.AD
  image: string
  link: string
  buttonText?: string
}

export interface InfoCard extends GenericExtraCard {
  type: CardTypes.INFO
  image: string
  imageAltText?: string
  header: string
  text: string
  link: string
  buttonText?: string
}
