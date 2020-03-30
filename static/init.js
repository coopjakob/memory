;(function() {
  const domain = 'https://zealous-murdock-e708be.netlify.com'

  const replaceElement = document.querySelector(
    "[data-type='MOST_PURCHASED_PRODUCTS']"
  )

  if (!replaceElement) {
    // eslint-disable-next-line no-console
    console.error('No place for memory')
    return
  }

  replaceElement.id = '__nuxt'
  replaceElement.innerHTML = ''
  replaceElement.className = ''

  function addScript(path) {
    const script = document.createElement('script')
    script.src = domain + path
    document.querySelector('body').appendChild(script)
  }

  addScript('/_nuxt/app.js')
  addScript('/_nuxt/runtime.js')

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = domain + '/_nuxt/app.css'
  document.querySelector('head').appendChild(link)
})()
