export default function({ store }) {
  if (window.ACC?.config) {
    store.dispatch('config/init', window.ACC.config)
  } else {
    // #console
    // copy(window.ACC.config)
    store.dispatch('config/init', {
      contextPath: '/handla',
      cartguid: '0474fb9a-81f7-41fc-8b84-fcea7c116fa8',
      encodedContextPath: '/handla',
      commonResourcePath: '/handla/_ui/responsive/common',
      themeResourcePath: '/handla/_ui/responsive/theme-coop',
      siteResourcePath: '/handla/_ui/responsive/site-coop',
      rootPath: '/handla/_ui/responsive',
      CSRFToken: '',
      authToken: '',
      rrSessionId: 's127098176418544',
      rrPersonalizeEndpoint:
        '/users/anonymous/personalize/personalize?placements=home_page.TopContent',
      rrProductsEndpoint:
        '/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1%7Chome_page.horizontal_recs3&fields=DEFAULT',
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
}
