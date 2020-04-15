import { mount } from '@vue/test-utils'
import Vue from 'vue'
import GridView from '@/components/GridView.vue'
import { CardTypes } from '@/types/Card'

const generateSkeletons = (n) =>
  Array(n).fill({
    type: CardTypes.SKELETON
  })

const mountWithProps = (component, props = {}) => {
  return mount(component, {
    propsData: {
      columns: 3,
      loading: false,
      didShowMore: false,
      isMobile: false,
      width: 800,
      cards: generateSkeletons(10),
      selectedFillers: [],
      emptySlots: 5,
      loadFull: jest.fn(),
      ...props
    }
  })
}

describe('Grid.spec.js', () => {
  test('snapshots', () => {
    // On desktop
    const wrapper = mountWithProps(GridView)
    expect(wrapper.element).toMatchSnapshot()

    // On mobile
    const wrapper2 = mountWithProps(GridView, {
      isMobile: true
    })
    expect(wrapper2.element).toMatchSnapshot()

    // On mobile with more content shown
    const wrapper3 = mountWithProps(GridView, {
      isMobile: true,
      didShowMore: true
    })
    expect(wrapper3.element).toMatchSnapshot()
  })

  describe('show more desktop', () => {
    test('no show more on desktop', () => {
      const wrapper = mountWithProps(GridView)
      expect(
        wrapper
          .find('.show-more')
          .find('button')
          .exists()
      ).toBe(false)
    })
  })

  describe('show more mobile', () => {
    let wrapper // eslint-disable-line
    const func = jest.fn(() => {
      wrapper.setProps({
        loading: true
      })
    })
    wrapper = mountWithProps(GridView, {
      loadFull: func,
      isMobile: true,
      cards: generateSkeletons(6)
    })

    test('is there a button to show more', () => {
      expect(wrapper.vm.cards.length).toBe(6)
      expect(wrapper.find('.show-more')).toBeTruthy()
    })

    test('show loading after clicking', async () => {
      wrapper
        .find('.show-more')
        .find('button')
        .trigger('click')
      await Vue.nextTick()
      expect(func.mock.calls.length).toBe(1)
      expect(wrapper.vm.loading).toBe(true)
      expect(wrapper.vm.isMobile).toBe(true)
      expect(wrapper.find('.show-more.loading').exists()).toBe(true)
    })

    test('after load', async () => {
      wrapper.setProps({
        didShowMore: true,
        loading: false,
        cards: generateSkeletons(30)
      })
      await Vue.nextTick()
      expect(wrapper.find('.show-more.loading').exists()).toBe(false)
      expect(wrapper.vm.cards.length).toBeGreaterThan(6)
    })
  })
})
