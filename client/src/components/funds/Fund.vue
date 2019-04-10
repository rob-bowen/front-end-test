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
        <button
          class="btn"
          :class="{
            toggleOn: showRaise
          }"
          @click="toggleRaise"
        >
          Raise
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
        <fund-raise
          v-if="showRaise"
          :portfolioName="portfolioName"
          :accountName="accountName"
          :fund="fund"
        />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { FundHolding } from "../../types/funds";

import FundHistoryChart from "./FundHistoryChart.vue";
import FundPercentageChart from "./FundPercentageChart.vue";
import FundDetails from "./FundDetails.vue";
import FundInvest from "./FundInvest.vue";
import FundRaise from "./FundRaise.vue";
import AccountVue from "../portfolio/Account.vue";

@Component({
  components: {
    FundHistoryChart,
    FundPercentageChart,
    FundDetails,
    FundInvest,
    FundRaise
  }
})
export default class Fund extends Vue {
  // Props
  @Prop() private fund!: FundHolding;
  @Prop() private accountName!: string;
  @Prop() private portfolioName!: string;

  // Data
  private showChart: boolean = false;
  private showInvest: boolean = false;
  private showRaise: boolean = false;

  // Methods
  toggleChart(): void {
    this.showChart = !this.showChart;
    this.showInvest = false;
    this.showRaise = false;
  }
  toggleInvest(): void {
    this.showInvest = !this.showInvest;
    this.showChart = false;
    this.showRaise = false;
  }
  toggleRaise(): void {
    this.showRaise = !this.showRaise;
    this.showInvest = false;
    this.showChart = false;
  }
}
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

@media (max-width: 600px) {
  .fund__row {
    flex-direction: column;
  }

  .fund__details {
    margin-top: 20px;
  }

  .fund__panel-options .btn {
    margin: 10px 0;
    display: block;
    width: 100%;
  }
}
</style>
