<template>
  <trend
    :data="mappedHistory"
    :gradient="['#634b78', '#967cad', '#634b78']"
    auto-draw
    smooth
  ></trend>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FundHistoryItem } from "../../types/funds";

@Component
export default class FundHistoryChart extends Vue {
  @Prop() private history!: FundHistoryItem[];

  get mappedHistory(): number[] {
    // Data is returned from api in reverse date order to how we need it, so we reverse a copy as desctructive.
    const arrayToReverse = [...this.history];
    const reversedHistory = arrayToReverse.reverse();

    // We only need the price, as thats all our simple chart displays
    return reversedHistory.map(historyItem => historyItem.price);
  }
}
</script>
