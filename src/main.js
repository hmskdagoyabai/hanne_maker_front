import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

import VueAnalytics from "vue-analytics";

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "UA-134062345-6",
  router,
});
