<template>
  <div class="fund">
    <div class="fund__row">
      <div class="fund__chart">
        <fund-percentage-chart
          :percentage-of-portfolio="fund.percentageOfPortfolio"
        />
      </div>
      <div class="fund__details">
        <fund-details :fund="fund" />
      </div>
    </div>
    <div class="fund__panels">
      <div class="fund__panel-options">
        <button
          class="btn"
          :class="{
            toggleOn: showChart
          }"
          @click="toggleChart"
        >
          Show Trend Chart
        </button>
        <button
          class="btn"
          :class="{
            toggleOn: showInvest
          }"
          @click="toggleInvest"
        >
          Invest
        </button>
      </div>
      <transition name="slide" mode="out-in">
        <fund-history-chart :history="fund.history" v-if="showChart" />
        <fund-invest
          v-if="showInvest"
          :portfolioName="portfolioName"
          :accountName="accountName"
          :fund="fund"
        />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import FundHistoryChart from "@/components/funds/FundHistoryChart";
import FundPercentageChart from "@/components/funds/FundPercentageChart";
import FundDetails from "@/components/funds/FundDetails";
import FundInvest from "@/components/funds/FundInvest";
import AccountVue from "../portfolio/Account.vue";
export default Vue.extend({
  components: {
    FundHistoryChart,
    FundPercentageChart,
    FundDetails,
    FundInvest
  },
  props: {
    fund: {
      type: Object,
      required: true
    },
    portfolioName: {
      type: String,
      required: true
    },
    accountName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showChart: false,
      showInvest: false
    };
  },
  methods: {
    toggleChart() {
      this.showChart = !this.showChart;
      this.showInvest = false;
    },
    toggleInvest() {
      this.showInvest = !this.showInvest;
      this.showChart = false;
    }
  }
});
</script>
<style scoped>
.fund__row {
  display: flex;
  align-items: center;
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
