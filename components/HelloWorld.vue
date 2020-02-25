<template>
  <div class="hello">
    <v-btn>Button: {{ msg }}</v-btn>
    <p v-if="error">{{ error }}</p>

    <div v-for="product in products" :key="product.code">
      <pre>{{ product.name }} <template v-if="product.fromSweden">🇸🇪</template><strong>{{ product.price.formattedValue }}</strong></pre>
    </div>
    --
    <pre>{{ JSON.stringify(products, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
/* eslint-disable dot-notation */
import { mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    msg: String
  },
  computed: mapState({
    products: 'products'
  })
})
class HelloWorld extends Vue {
  error = null
}
export default HelloWorld
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
pre {
  text-align: left;
}
</style>
