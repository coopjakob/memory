/* eslint-disable no-console */

import { bus } from '~/bus'

export const event = function(name: string, data?: Object) {
  // log
  console.debug(name, data)
  // emit
  bus.$emit(name, data)
}

function chat(name: string, text: string) {
  console.info(
    `%c<${name}> ${text}`,
    'background: #000; color: #fff; padding: 5px 10px'
  )
}

bus.$on('grid-mounted', () => {
  chat('Cooper', 'Hej! 👋')
})

bus.$on('show-card', (data) => {
  if (data.type === 'ad') {
    event('ga-send', {
      hitType: 'event',
      eventCategory: 'memory',
      eventAction: 'show-ad',
      eventLabel: data.name,
      nonInteraction: true
    })
  }
})

bus.$on('ad-click', (data) => {
  event('ga-send', {
    hitType: 'event',
    eventCategory: 'memory',
    eventAction: 'ad-click',
    eventLabel: data,
    transport: 'beacon'
  })
})

declare const ga: Function

bus.$on('ga-send', (data) => {
  if (typeof ga !== 'undefined') {
    ga('send', data)
  }
})
