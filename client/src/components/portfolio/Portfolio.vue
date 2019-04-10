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
import { Component, Prop, Vue } from "vue-property-decorator";

import "vue-css-donut-chart/dist/vcdonut.css";

import {
  Portfolio as PortfolioType,
  HoldingAmount,
  Fund,
  FundHolding,
  Account as AccountType
} from "../../types/funds";

import { calculateHoldingValueAndQuantity } from "../../services/fundsSvc";

import PortfolioAccount from "./PortfolioAccount.vue";
import PortfolioLoader from "./PortfolioLoader.vue";
import PortfolioError from "./PortfolioError.vue";

@Component({
  components: {
    PortfolioLoader,
    PortfolioAccount,
    PortfolioError
  }
})
export default class Portfolio extends Vue {
  @Prop() portfolio!: PortfolioType;
  @Prop() loadingData!: boolean;
  @Prop() errorLoadingData!: boolean;
  @Prop() selectedAccountName!: string;
  @Prop() usersPortfolioName!: string;
  @Prop() funds!: Fund[];

  // Methods
  handleRetry(): void {
    this.$emit("retry-load");
  }

  // Computed
  get portfolioName(): string {
    if (this.portfolio) {
      return this.portfolio.name;
    }
    return "";
  }
  get selectedAccount(): AccountType {
    return this.portfolio.accounts.find(
      account => account.name === this.selectedAccountName
    ) as AccountType;
  }
  get portfolioValue(): string {
    if (this.portfolio) {
      return `(Total value: £${(this.totalPortfolioWorth / 100).toFixed(2)})`;
    }
    return "";
  }
  get totalPortfolioWorth(): number {
    // Loop through and total all of the accounts
    const totalPortfolioValue: number = this.portfolio.accounts.reduce(
      (accountsAccumalotor: number, account: AccountType) => {
        // Loops through and total all the holdings in each account
        const holdingsKeys: string[] = Object.keys(account.holdings);
        const holdingValue: number = holdingsKeys.reduce(
          (holdingsAccumaltor: number, holdingKey: string) => {
            // Obtain the fund and holding amount for each holding
            const holdingAmount: HoldingAmount = this.selectedAccount.holdings[
              holdingKey
            ];
            const fund: Fund = this.funds.find(
              fund => fund.isin === holdingKey
            ) as Fund;

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
  }
}
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
