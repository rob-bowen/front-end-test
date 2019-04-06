import Vue from "vue";
import Toasted from "vue-toasted";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Toasted);

new Vue({
  render: h => h(App)
}).$mount("#app");
