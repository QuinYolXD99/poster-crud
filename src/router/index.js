import Vue from "vue";
import VueRouter from "vue-router";
import Analytics from "../views/Analytics.vue";
import Login from "../views/LoginSignup.vue";
import NotFound from "../views/404.vue";
import { isNullOrUndefined } from "util";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: {
        path: `/analytics/${localStorage.getItem("token")}`
    }
}, {
    path: "/analytics/:token?",
    name: "home",
    component: Analytics,
    beforeEnter: (to, from, next) => {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/account/Signup");
        } else {
            next();
        }
    }
},
{
    path: "*",
    name: "404",
    component: NotFound
},

{
    path: "/profile",
    name: "profile",
    component: () => import('../views/Profile'),
    beforeEnter: (to, from, next) => {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/account/Signup");
        } else {
            next();
        }
    }
},

{
    path: "/account/:page?",
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
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;