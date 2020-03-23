/* eslint-disable no-console */

import Vue from 'vue'

export default (_ctx, inject) => {
  const bus = new Vue()
  inject('bus', bus)

  function chat(name, text) {
    console.info(
      `%c<${name}> ${text}`,
      'background: #000; color: #fff; padding: 5px 10px'
    )
  }

  bus.$on('init', (data) => {
    console.debug(data)
    chat('Cooper', 'Hej! 👋')
  })
}
