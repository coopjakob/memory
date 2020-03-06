import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import ProductCard from '@/components/ProductCard.vue'

Vue.use(Vuetify)
Vue.filter('price', () => '')

const card = {
  categories: [
    { code: '16534', name: 'Frukt & Grönsaker' },
    { code: '32484', name: 'Frukt' },
    { code: '32492', name: 'Citrusfrukt' }
  ],
  clickUrl:
    'https://recs.richrelevance.com/rrserver/apiclick?a=c5aa3f92242c950c&cak=182bc783b3c1fff9&vg=e89f613e-a6f4-43ef-c685-b15c299cd070&stid=13&pti=9&pa=52047&pos=3&p=2317438900009&channelId=182bc783b3c1fff9&s=s39090634611392&rid=016001&sgs=customer_private%3APrivate+Customer&mvtId=46152&mvtTs=1583340686122',
  code: '2317438900009',
  comparisonPrice: {
    currencyIso: 'SEK',
    formattedValue: '26:95 kr/kg',
    priceType: 'BUY',
    value: 26.95
  },
  consumerInformationText: [],
  depositPrice: {
    currencyIso: 'SEK',
    formattedValue: '0:-',
    priceType: 'BUY',
    value: 0
  },
  fromSweden: false,
  images: [
    {
      altText: 'Apelsin',
      url: 'https://res.cloudinary.com/coopsverige/image/upload/393481.tiff'
    }
  ],
  manufacturer: 'Kl 1. Spanien',
  name: 'Apelsin',
  packageSize: 1,
  packageSizeInformation: '350 gram ungefärlig vikt',
  packageSizeUnit: 'KG',
  pieceWeight: 0.35,
  potentialPromotions: [],
  price: {
    currencyIso: 'SEK',
    formattedValue: '9:43',
    priceType: 'BUY',
    value: 9.43
  },
  url: '/handla/varor/frukt-gronsaker/frukt/citrusfrukt/apelsin-2317438900009',
  variances: [],
  type: 'product'
}

describe('ProductCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ProductCard, {
      propsData: {
        card
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
