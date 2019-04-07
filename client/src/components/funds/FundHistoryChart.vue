<template>
  <trend
    :data="mappedHistory"
    :gradient="['#634b78', '#967cad', '#634b78']"
    auto-draw
    smooth
  ></trend>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  computed: {
    mappedHistory() {
      // Data is returned from api in reverse date order to how we need it, so we reverse a copy as desctructive.
      const arrayToReverse = [...this.history];
      const reversedHistory = arrayToReverse.reverse();

      // We only need the price, as thats all our simple chart displays
      return reversedHistory.map(historyItem => historyItem.price);
    }
  }
});
</script>
