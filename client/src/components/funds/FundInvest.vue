<template>
  <div class="fund__invest">
    <p>Please enter the number of units you require.</p>
    <FormField
      id="units"
      type="number"
      :validationError="validationError"
      v-model="amount"
      labelText="Number of units"
      :narrow="true"
    ></FormField>
    <button class="btn" @click="handleClick">Invest</button>
    <p class="error" v-if="submitError">{{ submitError }}</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import FormField from "@/components/FormField";
import { showSuccessToast, showErrorToast } from "@/services/toastSvc";
import { placeTrade } from "@/services/portfolioSvc";
import { Trade } from "@/types/funds";
export default Vue.extend({
  components: {
    FormField
  },
  props: {
    portfolioName: {
      type: String,
      required: true
    },
    accountName: {
      type: String,
      required: true
    },
    fund: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      submitError: "",
      validationError: "",
      amount: "0"
    };
  },
  methods: {
    validateForm(): boolean {
      let hasErrors = false;
      this.validationError = "";
      this.submitError = "";

      const num = parseInt(this.amount, 10);

      if (isNaN(num) || num <= 0) {
        hasErrors = true;
        this.validationError =
          "Please enter a valid whole number greater than 0";
      } else {
        // This will remove any e's  as otherwise 1e etc is valid
        this.amount = num.toString();
      }

      return !hasErrors;
    },
    async handleClick(): Promise<void> {
      if (this.validateForm()) {
        try {
          const trade: Trade = {
            fundName: this.fund.isin,
            amount: parseInt(this.amount, 10)
          };
          await placeTrade(this.portfolioName, this.accountName, trade);
          // Handle successful login
          showSuccessToast("Trade posted ok!");
          // Clear the form down
          this.amount = "";
        } catch (e) {
          this.submitError =
            "Sorry, something has gone wrong. Please try again later.";
          showErrorToast("Something has gone wrong!");
        }
        return;
      }

      showErrorToast("Invalid amount entered!");
    }
  }
});
</script>
<style scoped>
.fund__invest {
  padding: 20px;
}
p.error {
  color: red;
  margin-top: 20px;
  margin-bottom: 0;
}
</style>
