export default function({ store }) {
  // TODO: Figure out how to read this
  // if (process.env.NODE_ENV !== 'production' && !('ACC' in global)) {
  //   global.ACC = {
  //     config: {}
  //   }
  // }

  store.dispatch('config/init', {
    contextPath: '/handla',
    cartguid: 'fa32f8d9-3602-480a-a8e3-36a262e89538',
    encodedContextPath: '/handla',
    commonResourcePath: '/handla/_ui/responsive/common',
    themeResourcePath: '/handla/_ui/responsive/theme-coop',
    siteResourcePath: '/handla/_ui/responsive/site-coop',
    rootPath: '/handla/_ui/responsive',
    CSRFToken: '',
    authToken: '',
    rrSessionId: 's39090634611392',
    rrPersonalizeEndpoint: '',
    rrProductsEndpoint:
      '/users/anonymous/products/recommend-segmented?placements=item_page.horizontal_recs1&productIds=7310500001890&fields=DEFAULT',
    coopStore: '016001',
    storeName: 'STOCKHOLM',
    rcsToken: '',
    user: 'anonymous',
    customerEmail: '',
    numberOfOrders: '',
    hasSavedCarts: false,
    medmeraId: '',
    sessionPostCode: '',
    googleApiKey: '',
    googleApiVersion: '3.7',
    swishPayment: '',
    pointOfService: '',
    b2bUser: false,
    externalAddToCartRecipe: '',
    orderConfirmationPlacementId: 'purchase_complete_page',
    loginUrl: '/handla/openid_connect_login',
    authenticationStatusUrl: '/handla/authentication/status'
  })
}
