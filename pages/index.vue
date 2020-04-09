<template>
  <div id="memory" class="o-start-module">
    <div class="header-module">
      <h2 class="a-heading-1">
        TESTMILJ&Ouml; / Popul&auml;ra varor
      </h2>
      <a class="a-link" href="" />
    </div>
    <Grid />
  </div>
</template>

<script>
import Grid from '@/components/Grid.vue'

if (
  process.env.NODE_ENV !== 'production' ||
  window.location.toString() === 'http://localhost:3000/'
) {
  // eslint-disable-next-line no-console
  console.warn('Using fake config - data is not real')
  window.ACC = {
    config: {
      cartguid: '145bda80-f874-4671-ab0b-c2be71355140',
      rrSessionId: 's162292562862688',
      coopStore: '016001',
      storeName: 'STOCKHOLM',
      user: 'anonymous',
      sessionPostCode: '11647',
      b2bUser: false
    }
  }

  // add Rich Relevance session identifier
  sessionStorage.setItem(
    'rcs',
    'eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg'
  )
}

export default {
  components: {
    Grid
  }
}
</script>

<style lang="css">
*,
div {
  /* like on coop.se */
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
  margin: 0;
}
a {
  cursor: pointer;
  color: #337ab7;
  text-decoration: none;
}
.a-link {
  color: #00aa46;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#memory {
  font-family: 'Akkurat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.o-start-module .header-module {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
.o-start-module .header-module .a-heading-1 {
  font-family: 'Akkurat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: -2px;
  margin-bottom: 24px;
}
.o-start-module .header-module .a-link {
  position: absolute;
  right: 0;
  z-index: 1;
  margin-top: -4px;
  font-size: 1.4rem;
}
</style>
