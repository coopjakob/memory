;(function() {
  const domain = 'https://coop-memory-jam.netlify.com/'

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = domain + '/_nuxt/app.css'
  document.querySelector('head').appendChild(link)

  function addScript(path) {
    const script = document.createElement('script')
    script.src = domain + path
    document.querySelector('body').appendChild(script)
  }

  const checkExist = setInterval(function() {
    if (window.ACC) {
      clearInterval(checkExist)
      // eslint-disable-next-line no-console
      console.debug('Memory: Config availible')

      const replaceElement = document.querySelector(
        "[data-type='MOST_PURCHASED_PRODUCTS']"
      )

      if (!replaceElement) {
        // eslint-disable-next-line no-console
        console.error('Memory: Element not found')
        return
      }

      replaceElement.id = '__nuxt'
      replaceElement.innerHTML = ''
      replaceElement.className = ''

      addScript('/_nuxt/app.js')
      addScript('/_nuxt/runtime.js')
    } else {
      // eslint-disable-next-line no-console
      console.debug('Memory: Config not found')
    }
  }, 100)
})()
