<template>
  <div class="portfolio">
    <h2>
      Portfolio
      <span class="portfolio__name">{{ portfolioName }}</span>
      <span class="portfolio__value">{{ portfolioValue }}</span>
    </h2>
    <transition name="slide" mode="out-in">
      <portfolio-loader v-if="loadingData"/>
      <portfolio-error v-else-if="errorLoadingData" @retry-load="handleRetry"/>
      <div v-else>
        <portfolio-account
          v-if="selectedAccount"
          :account="selectedAccount"
          :funds="funds"
          :totalPortfolioWorth="totalPortfolioWorth"
          :portfolioName="portfolioName"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import "vue-css-donut-chart/dist/vcdonut.css";
import {
  HoldingAmount,
  Fund,
  FundHolding,
  Account as AccountType
} from "@/types/funds";
import { calculateHoldingValueAndQuantity } from "@/services/fundsSvc";
import PortfolioAccount from "@/components/portfolio/PortfolioAccount";
import PortfolioLoader from "@/components/portfolio/PortfolioLoader";
import PortfolioError from "@/components/portfolio/PortfolioError";

export default Vue.extend({
  props: {
    loadingData: {
      type: Boolean,
      required: true
    },
    errorLoadingData: {
      type: Boolean,
      required: true
    },
    selectedAccountName: {
      type: String,
      required: true
    },
    usersPortfolioName: {
      type: String,
      required: true
    },
    portfolio: {
      type: Object,
      required: false
    },
    funds: {
      type: Array,
      required: false
    }
  },
  methods: {
    handleRetry(): void {
      this.$emit("retry-load");
    }
  },
  computed: {
    portfolioName() {
      if (this.portfolio) {
        return this.portfolio.name;
      }
      return "";
    },
    selectedAccount() {
      if (!this.portfolio) {
        return null;
      }

      return this.portfolio.accounts.find(
        (account: Account) => account.name === this.selectedAccountName
      );
    },
    totalPortfolioWorth(): number {
      if (!this.portfolio) return 0;

      // Loop through and total all of the accounts
      const totalPortfolioValue: number = this.portfolio.accounts.reduce(
        (accountsAccumalotor: number, account: AccountType) => {
          // Loops through and total all the holdings in each account
          const holdingsKeys: string[] = Object.keys(account.holdings);
          const holdingValue: number = holdingsKeys.reduce(
            (holdingsAccumaltor: number, holdingKey: string) => {
              // Obtain the fund and holding amount for each holding
              const holdingAmount: HoldingAmount = this.selectedAccount
                .holdings[holdingKey];
              const fund: Fund = this.funds.find(
                fund => fund.isin === holdingKey
              );

              const [holdingValue] = calculateHoldingValueAndQuantity(
                fund,
                holdingAmount
              );
              return holdingsAccumaltor + holdingValue;
            },
            0
          );
          // Add the final account total onto the portfolio total
          return accountsAccumalotor + holdingValue;
        },
        0
      );
      return totalPortfolioValue;
    },
    portfolioValue(): string {
      if (!this.portfolio) return "";

      return `(Total value: £${(this.totalPortfolioWorth / 100).toFixed(2)})`;
    }
  },
  components: {
    PortfolioLoader,
    PortfolioAccount,
    PortfolioError
  }
});
</script>
<style scoped>
.portfolio {
  padding: 20px 30px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #efefef;
  box-shadow: 4px 4px 4px #333;
}
.portfolio__value {
  font-style: italic;
  font-size: 2rem;
  margin-left: 10px;
}

@media (max-width: 760px) {
  .portfolio__value {
    display: block;
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
