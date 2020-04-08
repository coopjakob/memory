export interface ConfigState {
  cartguid?: String
  authToken?: String
  rrSessionId?: String
  coopStore?: String
  storeName?: String
  user?: String
  numberOfOrders?: Number
  hasSavedCarts?: Boolean
  medmeraId?: string
  b2bUser?: Boolean
  postCode?: String
  deliveryMode?: {
    code: String
    name: String
  }
}
