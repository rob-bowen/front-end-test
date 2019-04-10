<template>
  <div class="portfolio__error">
    <p>
      An error has occurred. Click 'Retry' to reload, and if the problem
      persists, please try later.
    </p>
    <p>
      <button class="btn" @click="handleRetry">Retry</button>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PortfolioError extends Vue {
  handleRetry(): void {
    this.$emit("retry-load");
  }
}
</script>
<style scoped>
.portfolio__error {
  margin: 20px 0;
}

.portfolio__error p:last-child {
  text-align: center;
}
</style>
