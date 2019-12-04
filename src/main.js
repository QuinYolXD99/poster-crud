import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import { configs } from './config/config';
// import VuetifyAlgoliaPlaces from 'vuetify-algolia-places';
// Vue.use(VuetifyAlgoliaPlaces, {
//     algolia: {
//       appId: 'plOVFQGGOVA5', // Optional
//       apiKey: '0b9764b6f94206dfcd5190ff392f8b69', // Optional
//     },
//   });
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$jwt_decode = jwt_decode;
Vue.prototype.$_CONFIG = configs();
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");