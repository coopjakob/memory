import { Module } from 'vuex'
import { CartState } from '../types/Cart'

const cardsModule: Module<CartState, any> = {
  state(): CartState {
    return {
      type: 'cartWsDTO',
      appliedOrderPromotions: [],
      appliedProductPromotions: [],
      code: '31026397',
      entries: [
        {
          entryNumber: 0,
          product: {
            code: '7394376616037',
            depositPrice: {
              currencyIso: 'SEK',
              formattedValue: '0:-',
              priceType: 'BUY',
              value: 0.0
            },
            keywords: [],
            name: 'Mellanmjölk Eko',
            pickPrice: {
              currencyIso: 'SEK',
              formattedValue: '11:50',
              priceType: 'BUY',
              value: 11.5
            },
            unit: {
              name: 'st'
            },
            url:
              '/handla/varor/mejeri-agg/mjolk-fil/mjolk/mellanmjolk-eko-7300170062642',
            variances: []
          },
          quantity: 1,
          replace: true,
          totalPrice: {
            currencyIso: 'SEK',
            formattedValue: '11:50',
            priceType: 'BUY',
            value: 11.5
          }
        }
      ],
      extraAmountToBeReserved: {
        currencyIso: 'SEK',
        formattedValue: '4:00 kr',
        priceType: 'TOTAL',
        value: 4.0
      },
      guid: 'a6360054-821c-402d-bf85-3e87a4d6d8e5',
      isPartOfSubscription: false,
      postCode: '17261',
      timeWindow: {},
      totalDepositSum: {
        currencyIso: 'SEK',
        formattedValue: '0:00 kr',
        priceType: 'TOTAL',
        value: 0.0
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: 'SEK',
        formattedValue: '11:50 kr',
        priceType: 'TOTAL',
        value: 11.5
      },
      totalPriceWithExtraAmountToReserve: {
        currencyIso: 'SEK',
        formattedValue: '15:50 kr',
        priceType: 'TOTAL',
        value: 15.5
      },
      totalPriceWithTax: {
        currencyIso: 'SEK',
        formattedValue: '11:50 kr',
        priceType: 'TOTAL',
        value: 11.5
      },
      totalQuantity: 1,
      totalTaxValues: [
        {
          appliedValue: {
            currencyIso: 'SEK',
            formattedValue: '1:23 kr',
            priceType: 'TOTAL',
            value: 1.23
          },
          value: 12.0
        }
      ],
      amountMissing: {
        currencyIso: 'SEK',
        formattedValue: '488:50 kr',
        priceType: 'TOTAL',
        value: 488.5
      },
      coopStore: {
        code: '016001',
        enova: false,
        foodBagsOnly: false,
        name: 'STOCKHOLM'
      },
      isExtraOrderCart: false,
      recipesGroups: [],
      replaceAll: true
    }
  },
  mutations: {
    setCart(state, payload) {
      state = payload
    }
  }
}

export default cardsModule
