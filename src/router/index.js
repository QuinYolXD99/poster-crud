import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginSignup.vue";
import { isNullOrUndefined } from "util";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
   {
    path: "*",
     redirect:{
      path :"/"
     }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!isNullOrUndefined(localStorage.getItem("token"))) {
        next("/");
      } else {
        next("/");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
