<template>
  <dl>
    <dt>ISIN</dt>
    <dd>{{ fund.isin }}</dd>
    <dt>Name</dt>
    <dd>{{ fund.name }}</dd>
    <dt>Value</dt>
    <dd>£{{ fund.value | toTwoDigits }}</dd>
    <dt>Current Price</dt>
    <dd>£{{ fund.price | toTwoDigits }}</dd>
  </dl>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { FundHolding } from "../../types/funds";

@Component
export default class FundDetails extends Vue {
  @Prop() private fund!: FundHolding;
}
</script>

<style scoped>
dt {
  display: block;
  margin-right: 10px;
  margin-bottom: 5px;
}

dt:after {
  content: ":";
}

dd {
  display: block;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
