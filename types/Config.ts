export interface ConfigState {
  cartguid?: String
  authToken?: String
  rrSessionId?: String
  coopStore?: String
  storeName?: String
  user?: String
  numberOfOrders?: Number
  hasSavedCarts?: Boolean
  medmeraId?: String
  b2bUser?: Boolean
  sessionPostCode?: String
  deliveryMode?: {
    code: String
    name: String
  }
}
