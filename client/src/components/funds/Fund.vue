<template>
  <div class="fund">
    <div class="fund__row">
      <div class="fund__chart">
        <fund-percentage-chart :percentage-of-portfolio="fund.percentageOfPortfolio"/>
      </div>
      <div class="fund__details">
        <fund-details :fund="fund"/>
      </div>
    </div>
    <div class="fund__panels">
      <div class="fund__panel-options">
        <button
          class="btn"
          :class="{
          toggleOn:  showChart
        }"
          @click="toggleChart"
        >Show Trend Chart</button>
      </div>
      <transition name="slide" mode="out-in">
        <fund-history-chart :history="fund.history" v-if="showChart"/>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import FundHistoryChart from "@/components/funds/FundHistoryChart";
import FundPercentageChart from "@/components/funds/FundPercentageChart";
import FundDetails from "@/components/funds/FundDetails";
export default Vue.extend({
  components: {
    FundHistoryChart,
    FundPercentageChart,
    FundDetails
  },
  props: {
    fund: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showChart: false
    };
  },
  methods: {
    toggleChart() {
      this.showChart = !this.showChart;
    }
  }
});
</script>
<style scoped>
.fund__row {
  display: flex;
  background-color: #eae4ee;
  padding: 20px;
  font-size: 2rem;
}

.fund__details {
  flex-grow: 1;
  padding: 0 20px;
}

.fund__panels {
  background-color: rgb(225, 225, 225);
  border-bottom: 1px solid #aaa;
}

.fund__panel-options {
  padding: 15px;
}
</style>
