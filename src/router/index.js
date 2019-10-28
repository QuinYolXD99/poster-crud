import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import ImageViewer from "../views/ImageViewer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/imageViewer",
  //   name: "ImageViewer",
  //   component: ImageViewer,
  //   props: true

  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
