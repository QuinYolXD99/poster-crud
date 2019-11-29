import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

var defaultOpts = {
  toolbar: {
    zoomOut: 1,
    oneToOne: 0,
    reset: 0,
    prev: 1,
    play: {
      show: 1,
      size: 'large',
    }, next: 1,
    zoomIn: 1,
    rotateLeft: 0,
    rotateRight: 0,
    flipHorizontal: 0,
    flipVertical: 0,
  }
}
Vue.use(Viewer,{
  defaultOptions:defaultOpts
})

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
