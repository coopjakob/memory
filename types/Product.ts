interface Price {
  formattedValue: string
}

interface Image {
  altText: string
  url: string
}

interface Promotion {
  maxUseText: boolean
  medmera: boolean
  description: string
}

interface Category {
  code: string
  name: string
}

export default interface Product {
  name: string
  images: Array<Image>
  url: string
  code: string
  manufacturer: string
  packageSizeInformation: string
  comparisonPrice: Price
  deposit: Price
  depositPrice: Price
  price: Price
  consumerInformationText: string
  fromSweden: boolean
  promotionPrice: Price
  potentialPromotions: Array<Promotion>
  categories: Array<Category>
  productLabels: Array<Category>
}
