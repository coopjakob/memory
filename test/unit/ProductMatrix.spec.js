import { mount } from '@vue/test-utils'

import ProductMatrix from '@/components/ProductMatrix.vue'

window.ACC = {
  config: {
    rrSessionId: 's109421930639200',
    user: 'anonymous',
    coopStore: '016001',
    cartguid: '145bda80-f874-4671-ab0b-c2be71355140'
  }
}

const wrapper = mount(ProductMatrix)

describe('products shown on desktop', () => {
  test('number of products is more than 6', () => {
    setTimeout(() => {
      expect(wrapper.vm.showProducts.length).toBeGreaterThan(6)
    }, 1000)
  })

  test('number of rows is 3', () => {
    setTimeout(() => {
      expect(wrapper.vm.rows).toBe(3)
    }, 2000)
  })
})

describe('test number of products when width is mobile', () => {
  wrapper.vm.$el.style.width = '375px'

  test('test container width', () => {
    expect(wrapper.vm.$el.style.width).toBe('375px')
  })

  test('number of products is 6', () => {
    setTimeout(() => {
      expect(wrapper.vm.showProducts.length).toBe(6)
    }, 1000)
  })

  test('is there a button to show more', () => {
    setTimeout(() => {
      expect(wrapper.find('.show-more')).toBeTruthy()
    }, 1000)
  })

  setTimeout(() => {
    wrapper
      .find('.show-more')
      .find('button')
      .trigger('click')
  }, 1000)

  test('number of products is more than 6', () => {
    setTimeout(() => {
      expect(wrapper.vm.showProducts.length).toBeGreaterThan(6)
    }, 1000)
  })

  setTimeout(() => {}, 10000)
})
