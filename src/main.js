import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import { configs } from './config/config';

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$jwt_decode = jwt_decode;
Vue.prototype.$_CONFIG = configs();
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");