export default function({ store }) {
  if (process.env.NODE_ENV !== 'production' && !('ACC' in global)) {
    // tip: console copy(window.ACC.config)
    store.dispatch('config/init', {
      contextPath: '/handla',
      cartguid: '145bda80-f874-4671-ab0b-c2be71355140',
      encodedContextPath: '/handla',
      commonResourcePath: '/handla/_ui/responsive/common',
      themeResourcePath: '/handla/_ui/responsive/theme-coop',
      siteResourcePath: '/handla/_ui/responsive/site-coop',
      rootPath: '/handla/_ui/responsive',
      CSRFToken: '',
      authToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OEIzMjQwOTExQkE4QkYxRUZDNzI2NDI3MTFGQ0U3RkM0RUNEMkMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJsNHN5UUpFYnFMOGVfSEprSnhIODVfeE96U3cifQ.eyJuYmYiOjE1ODUzMDU5ODgsImV4cCI6MTU4NTMwOTU4OCwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb29wLnNlIiwiYXVkIjpbImh0dHBzOi8vbG9naW4uY29vcC5zZS9yZXNvdXJjZXMiLCJoeWJyaXNfYXBpIl0sImNsaWVudF9pZCI6Imh5YnJpc19jbXNfcHJvZCIsInN1YiI6ImExNDg2NDllLTIzNWEtNDE1Ny04ZGY4LTViMmFhNDI0ZWE3ZCIsImF1dGhfdGltZSI6MTU4NTEzMTg2MSwiaWRwIjoibG9jYWwiLCJlbm92YUlkIjoiMjA5MjMxMjI0IiwiaXNDb21wYW55IjoiRmFsc2UiLCJsYXN0TG9naW5EYXRlIjoiMjAyMC0wMy0yNSAxMToyNDoyMSIsImlkMzYwIjoiM2I0YmJiNTQtM2IxYS00MWExLWJmZDMtMzdiODFlZjE4ODNiIiwiZW1haWwiOiJqYWtvYi5uYW5uZXNvbkBjb29wLnNlIiwic2NvcGUiOlsiaHlicmlzLnByb2ZpbGUiLCJvcGVuaWQiLCJoeWJyaXNfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.Fs9xrXTSmsKiUn2xOudnzkl4mEUb_GOqluHXzOaVNLQ6t9-h4rNAqjNK1hFfw03f7BHIlN1wMuJEtSdCtp12Rf-UvzugdaHR2w1SWItUcqNvBg-FV_JBaPsCMb1lEcVK9dVkcktl9bNV-Ph4IKgG412OP4dYE7T6NGb6NBWjlJAcebOoFom4Gwf-TzBGmg8ZD3BGVs8oZDXS56oeJs6xCQkZy8XJ8Z1_JExe8Yr_3t9T0Ti1kxeEVVZfNkEVrwRam64S9AgiSik2jTZfJxja4FPAqW3OfTx_NYF5y7eN0RCTZEwUDhFeZUdW_RSuXNAgBeoXSIMqCReggI8M1wEkVg',
      rrSessionId: 's3946166023056',
      rrPersonalizeEndpoint:
        '/users/a148649e-235a-4157-8df8-5b2aa424ea7d/personalize/personalize?placements=home_page.TopContent',
      rrProductsEndpoint:
        '/users/a148649e-235a-4157-8df8-5b2aa424ea7d/products/recommend-segmented?placements=home_page.horizontal_recs1%7Chome_page.horizontal_recs3&fields=DEFAULT',
      coopStore: '016001',
      storeName: 'STOCKHOLM',
      rcsToken: '',
      user: 'a148649e-235a-4157-8df8-5b2aa424ea7d',
      customerEmail: '',
      numberOfOrders: '0',
      hasSavedCarts: false,
      medmeraId: '',
      sessionPostCode: '',
      googleApiKey: '',
      googleApiVersion: '3.7',
      swishPayment: '',
      pointOfService: '252711',
      b2bUser: false,
      externalAddToCartRecipe: '',
      orderConfirmationPlacementId: 'purchase_complete_page',
      loginUrl: '/handla/openid_connect_login',
      authenticationStatusUrl: '/handla/authentication/status',
      deliveryMode: {
        code: 'pickup_drive_through',
        name: 'Hämta med bil'
      }
    })
  } else {
    store.dispatch('config/init', window.ACC.config)
  }
}
