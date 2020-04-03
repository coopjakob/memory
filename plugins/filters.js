import Vue from 'vue'

Vue.filter('price', (val) => {
  if (!val || !val.formattedValue) {
    return ''
  }
  return val.formattedValue
})
