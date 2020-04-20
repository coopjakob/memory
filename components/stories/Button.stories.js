import { linkTo } from '@storybook/addon-links'
import Button from '@/components/Button'

export default {
  title: 'Button',
  component: Button
}

const components = { 'c-button': Button }

export const normal = () => ({
  components,
  methods: {
    goto: linkTo('Button', 'Disabled button')
  },
  template: `
    <c-button
      :disabled="false"
      @click="goto()"
    >
      Visa mer
    </c-button>
  `
})

normal.story = {
  name: 'Normal button'
}

export const disabled = () => ({
  components,
  template: `
    <c-button
      :disabled="true"
      @click="() => {}"
    >
      Disabled
    </c-button>
  `
})

disabled.story = {
  name: 'Disabled button'
}
