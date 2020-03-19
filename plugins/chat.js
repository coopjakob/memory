/* eslint-disable no-console */

export default function(context, inject) {
  const { app } = context
  const names = {
    c: 'Cooper',
    p: 'Patrik',
    a: 'Ann'
  }
  app.$bus.$on('chat', ([who, text]) => {
    console.info(
      `%c<${names[who] || 'Unknown'}> ${text}`,
      'background: #000; color: #fff; padding: 5px 10px'
    )
  })
  inject('chat', (who, text) => {
    app.$bus.$emit('chat', [who, text])
  })
}
