<template>
  <div class="account">
    <h3>Account {{ account.name }}</h3>
    <fund
      v-for="fund in accountFunds"
      :key="fund.isin"
      :fund="fund"
      :portfolioName="portfolioName"
      :accountName="account.name"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import FundComponent from "@/components/funds/Fund.vue";

import { Account, FundHolding, HoldingAmount, Fund } from "../../types/funds";

import { createFundHoldings } from "../../services/fundsSvc";

@Component({
  components: {
    Fund: FundComponent
  }
})
export default class PortfolioAccount extends Vue {
  @Prop() portfolioName!: string;
  @Prop() account!: Account;
  @Prop() funds!: Fund[];
  @Prop() totalPortfolioWorth!: number;

  get accountFunds(): FundHolding[] {
    // Account.holdings is an object whose keys are the funds ISINS
    const holdingsKeys: string[] = Object.keys(this.account.holdings);

    // Convert into our FundHolding objects
    const fundHoldings: FundHolding[] = holdingsKeys.map(holdingKey => {
      // For each key we get the holding amount stored against it.
      const holdingAmount: HoldingAmount = this.account.holdings[holdingKey];

      // Find the fund the holding relates to so it can be used by our calculations
      const fund: Fund = this.funds.find(
        fund => fund.isin === holdingKey
      ) as Fund;

      return createFundHoldings(fund, holdingAmount, this.totalPortfolioWorth);
    });
    return fundHoldings;
  }
}
</script>
