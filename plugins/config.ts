import { ConfigState } from '~/types/Config'

declare global {
  interface Window {
    ACC?: {
      config: any
    }
  }
}

const development: ConfigState = {
  authToken: '',
  cartguid: 'fa32f8d9-3602-480a-a8e3-36a262e89538',
  coopStore: '016001',
  rrSessionId: 's39090634611392',
  user: 'anonymous',
  b2bUser: false,
  storeName: 'STOCKHOLM',
  postCode: '12345'
}

export default function({ store }) {
  const config = window.ACC?.config || development
  store.dispatch('config/init', config)
}
