<template>
  <vc-donut
    :sections="[{ value: percentageOfPortfolio, color: '#634b78' }]"
    :size="200"
    unit="px"
    foreground="#967cad"
    :thickness="40"
  >
    <div class="fund__chart-desc">
      <span>{{ percentageOfPortfolio | percentage }}</span>
      <span>of</span>
      <span>portfolio</span>
    </div>
  </vc-donut>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FundPercentageChart extends Vue {
  // Props
  @Prop() private percentageOfPortfolio!: number;
}
</script>
<style scoped>
.fund__chart-desc span {
  display: block;
  margin: 5px 0;
  text-transform: uppercase;
  font-size: 1.5rem;
}

.fund__chart-desc span:first-child {
  font-weight: 700;
  font-size: 2.5rem;
}
</style>
