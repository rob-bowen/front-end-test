<template>
  <div class="portfolio__loading">
    <pulse-loader />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default Vue.extend({
  components: {
    PulseLoader
  }
});
</script>
<style scoped>
.portfolio__loading {
  text-align: center;
  margin: 20px;
}
</style>
