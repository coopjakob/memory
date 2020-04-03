import { shallowMount } from '@vue/test-utils'
import Splash from '@/components/Splash.vue'

const description = [
  {
    input: '15:- /st',
    label: false,
    price: '15:-',
    decimal: false,
    unit: false
  },
  {
    input: '26.90 /st',
    label: false,
    price: '26',
    decimal: '90',
    unit: '/st'
  },
  {
    input: '23:90 /st',
    label: false,
    price: '23',
    decimal: '90',
    unit: '/st'
  },
  {
    input: '2 för 40:-',
    label: '2 för',
    price: '40:-',
    decimal: false,
    unit: false
  },
  {
    input: '149:- /kg',
    label: '1 kg',
    price: '149:-',
    decimal: false,
    unit: false
  },
  {
    input: '19:90 /kg',
    label: false,
    price: '19',
    decimal: '90',
    unit: '/kg'
  },
  {
    input: '169:75 kr/kg',
    label: false,
    price: '169',
    decimal: '75',
    unit: '/kg'
  }
]

describe('input', () => {
  for (const entry of description) {
    test(entry.input, () => {
      const wrapper = shallowMount(Splash)
      wrapper.setProps({
        description: entry.input
      })

      if (entry.label) {
        expect(wrapper.vm.splash.label).toBe(entry.label)
      } else {
        expect(wrapper.vm.splash.label).toBeFalsy()
      }

      expect(wrapper.vm.splash.price).toBe(entry.price)

      if (entry.decimal) {
        expect(wrapper.vm.splash.decimal).toBe(entry.decimal)
      } else {
        expect(wrapper.vm.splash.decimal).toBeFalsy()
      }

      if (entry.unit) {
        expect(wrapper.vm.splash.unit).toBe(entry.unit)
      } else {
        expect(wrapper.vm.splash.unit).toBeFalsy()
      }
    })
  }
})
