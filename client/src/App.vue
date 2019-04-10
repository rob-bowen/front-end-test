<template>
  <div id="app">
    <site-header :is-logged-in="isLoggedIn" @user-logged-out="handleLogOut" />
    <transition name="slide" mode="out-in">
      <login v-if="notLoggedIn" @user-logged-in="handleLogIn" />
      <portfolio
        v-else
        :funds="funds"
        :portfolio="portfolio"
        :selectedAccountName="selectedAccountName"
        :loadingData="loadingData"
        :errorLoadingData="errorLoadingData"
        :usersPortfolioName="usersPortfolioName"
        @retry-load="loadData"
        >Logged In!</portfolio
      >
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import SiteHeader from "@/components/SiteHeader.vue";
import Login from "@/components/Login.vue";
import Portfolio from "@/components/portfolio/Portfolio.vue";
import { ApplicationState } from "./types/state";
import { getFundsWithHistory } from "./services/fundsSvc";
import { getPortfolioWithAccounts } from "./services/portfolioSvc";

export default Vue.extend({
  components: {
    SiteHeader,
    Login,
    Portfolio
  },
  computed: {
    notLoggedIn() {
      return !this.isLoggedIn;
    }
  },
  data(): ApplicationState {
    return {
      usersPortfolioName: "",
      selectedAccountName: "",
      isLoggedIn: false,
      funds: undefined,
      portfolio: undefined,
      loadingData: false,
      errorLoadingData: false
    };
  },
  methods: {
    handleLogIn() {
      // Obviously these two lines being hard coded are not 'real world'
      this.usersPortfolioName = "ADA123456789";
      this.selectedAccountName = "ADA123456789-ISA";

      this.isLoggedIn = true;
      this.loadData();
    },
    async loadData() {
      try {
        // Set loading status flags
        this.loadingData = true;
        this.errorLoadingData = false;

        // Actually fetch the data
        const [funds, portfolio] = await Promise.all([
          getFundsWithHistory(),
          getPortfolioWithAccounts(this.usersPortfolioName)
        ]);
        // Set success flags
        this.funds = funds;
        this.portfolio = portfolio;
        this.loadingData = false;
      } catch (ex) {
        // Set failure flags
        this.loadingData = false;
        this.errorLoadingData = true;
      }
    },
    handleLogOut() {
      this.usersPortfolioName = "";
      this.selectedAccountName = "";
      this.isLoggedIn = false;
      this.portfolio = undefined;
      this.funds = undefined;
      this.loadingData = false;
      this.errorLoadingData = false;
    }
  }
});
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  line-height: 1.5;
  height: 100%;
}

body {
  font-size: 1.8rem;
  font-family: lato, sans-serif;
  height: 100%;
  background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.6)
    )
    #634b78 fixed;
  color: #555;
  padding: 20px 30px;
}

h1,
h2,
h3 {
  font-weight: 300;
  letter-spacing: 0.1rem;
}

h1 {
  font-size: 4rem;
  line-height: 5rem;
  word-spacing: 0.4rem;
  color: #fff;
  margin-right: 20px;
}

h2 {
  font-size: 3rem;
  margin-bottom: 20px;
}

h3 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}

button {
  outline: none;
  padding: 0;
  margin: 0;
}

.btn,
.btn:link,
.btn:visited {
  cursor: pointer;
  font-size: 1.6rem;
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #493759;
  background-color: #634b78;
  border-radius: 50px;
  text-decoration: none;
  color: #fff;
  box-shadow: 3px 3px 3px #333;
  transition: background-color 0.4s, box-shadow 0.2s;
}

.btn:hover,
.btn:active {
  background-color: #493759;
}

/* Very slight impression of depth change as the button is pressed */
.btn:active {
  box-shadow: 2px 2px 2px #333;
}

.btn.toggleOn {
  background-color: #967cad;
}

.btn + .btn {
  margin-left: 10px;
}

#app {
  max-width: 1120px;
  min-height: calc(100vh - 40px); /* 40px = vertical body padding */
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s, transform 0.5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
