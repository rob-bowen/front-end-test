<template>
  <dl>
    <dt>ISIN</dt>
    <dd>{{ fund.isin }}</dd>
    <dt>Name</dt>
    <dd>{{ fund.name }}</dd>
    <!-- <dt>Quanity Held</dt>
    <dd>{{ fund.quantity }}</dd>-->
    <dt>Value</dt>
    <dd>£{{ fund.value | toTwoDigits }}</dd>
    <dt>Current Price</dt>
    <dd>£{{ fund.price | toTwoDigits }}</dd>
  </dl>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    fund: {
      type: Object,
      required: true
    }
  }
});
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
