<template>
  <div class="portfolio__loading">
    <pulse-loader />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";

@Component({
  components: {
    PulseLoader
  }
})
export default class PortfolioLoader extends Vue {}
</script>
<style scoped>
.portfolio__loading {
  text-align: center;
  margin: 20px;
}
</style>
