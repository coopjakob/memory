<template>
  <div id="memory" class="o-start-module">
    <div class="header-module">
      <h2 class="a-heading-1">
        TESTMILJ&Ouml; / Popul&auml;ra varor
      </h2>
      <a class="a-link" href="" />
    </div>
    <grid
      class="hide-in-percy"
      placement="home_page.horizontal_recs1"
      :rows="1"
    />
    <grid
      id="main"
      placement="home_page.2020_start_few"
      placement-more="home_page.2020_start_full"
      :rows="3"
    />
  </div>
</template>

<script>
import Grid from '@/components/Grid.vue'

export default {
  components: {
    Grid
  },
  middleware() {
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
}
</script>

<style lang="scss" scoped>
@media only percy {
  .hide-in-percy {
    visibility: hidden;
  }
}
</style>
