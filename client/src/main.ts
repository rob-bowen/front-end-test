import Vue from "vue";
import Toasted from "vue-toasted";
import Trend from "vuetrend";
import Donut from "vue-css-donut-chart";

import App from "./App.vue";

Vue.config.productionTip = false;

// Use Plugins
Vue.use(Toasted);
Vue.use(Trend);
Vue.use(Donut);

// Add filters
Vue.filter("percentage", function(number: number) {
  return `${number.toFixed()}%`;
});
Vue.filter("toTwoDigits", function(number: number) {
  return (number / 100).toFixed(2);
});

new Vue({
  render: h => h(App)
}).$mount("#app");
