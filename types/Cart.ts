interface Price {
  currencyIso: String
  formattedValue: String
  priceType: String
  value: Number
}

interface CartProduct {
  code: String
  depositPrice: Price
  keywords: Array<any>
  name: String
  pickPrice: Price
  unit: {
    name: String
  }
  url: String
  variances: Array<any>
}

export interface CartState {
  type: String
  appliedOrderPromotions: Array<any>
  appliedProductPromotions: Array<any>
  code: String
  entries: Array<{
    entryNumber: Number
    product: CartProduct
    quantity: Number
    replace: Boolean
    totalPrice: Price
  }>
  extraAmountToBeReserved: Price
  guid: String
  isPartOfSubscription: Boolean
  postCode: String
  timeWindow: any
  totalDepositSum: Price
  totalItems: Number
  totalPrice: Price
  totalPriceWithExtraAmountToReserve: Price
  totalPriceWithTax: Price
  totalQuantity: Number
  totalTaxValues: Array<{
    appliedValue: Price
    value: Number
  }>
  amountMissing: Price
  coopStore: {
    code: String
    enova: Boolean
    foodBagsOnly: Boolean
    name: String
  }
  isExtraOrderCart: Boolean
  recipesGroups: Array<any>
  replaceAll: Boolean
}
