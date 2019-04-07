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
import Vue from "vue";

import Fund from "@/components/funds/Fund";
import { FundHolding, HoldingAmount, Fund as FundType } from "@/types/funds";
import { createFundHoldings } from "@/services/fundsSvc";

export default Vue.extend({
  props: {
    portfolioName: {
      type: String,
      required: true
    },
    account: {
      type: Object,
      required: true
    },
    funds: {
      type: Array,
      required: true
    },
    totalPortfolioWorth: {
      type: Number,
      required: true
    }
  },
  components: {
    Fund
  },
  computed: {
    accountFunds(): FundHolding[] {
      if (!this.account) return [];

      // Account.holdings is an object whose keys are the funds ISINS
      const holdingsKeys: string[] = Object.keys(this.account.holdings);

      // Convert into our FundHolding objects
      const funds: FundHolding[] = holdingsKeys.map(holdingKey => {
        const holdingAmount: HoldingAmount = this.account.holdings[holdingKey];

        // Find the fund the holding relates to so it can be used by our calculations
        const fund: FundType = this.funds.find(
          fund => fund.isin === holdingKey
        );

        return createFundHoldings(
          fund,
          holdingAmount,
          this.totalPortfolioWorth
        );
      });
      return funds;
    }
  }
});
</script>
