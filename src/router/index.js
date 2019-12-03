import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginSignup.vue";
import NotFound from "../views/404.vue";
import { isNullOrUndefined } from "util";
// import { isNullOrUndefined } from "util";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: {
            path: `/home/${localStorage.getItem('token')}`
        }
    },
    {
        path: "/home/:token",
        name: "home",
        component: Home
    },
    {
        path: "*",
        name: "404",
        component: NotFound
    },
    {
        path: "/account/:page",
        name: "Account",
        component: Login,
        props: true,
        beforeEnter: (to, from, next) => {
            if (!isNullOrUndefined(localStorage.getItem("token"))) {
                next("/");
            } else {
                next();
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