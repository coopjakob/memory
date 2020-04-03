/* eslint-disable no-console */

import { bus } from '~/bus'

export default function(name) {
  // log
  console.debug(name)
  // emit
  bus.$emit(name)
}

function chat(name, text) {
  console.info(
    `%c<${name}> ${text}`,
    'background: #000; color: #fff; padding: 5px 10px'
  )
}

bus.$on('grid-mounted', () => {
  chat('Cooper', 'Hej! 👋')
})
