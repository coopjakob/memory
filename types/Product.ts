interface Price {
  formattedValue: string
}

interface Image {
  url: string
}

export default interface Product {
  name: string
  images: Array<Image>
  code: string
  price: Price
  promotionPrice: Price
  potentialPromotions: Array<{
    maxUseText: boolean
  }>
}
