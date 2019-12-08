import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import Login from "../views/LoginSignup.vue";
import NotFound from "../views/404.vue";
import { isNullOrUndefined } from "util";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: {
            path: isNullOrUndefined(localStorage.getItem("token")) ? '/analytics/' : "/account/user/Login"
        }
    }, {
        path: "/analytics",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (isNullOrUndefined(localStorage.getItem("token"))) {
                next("/account/user/Signup");
            } else {
                if (JSON.parse(localStorage.getItem("token")).account.role == "admin") {
                    next();
                } else {
                    next("/404");
                }
            }
        }
    },
    {
        path: "/404",
        redirect: {
            path: "*"
        }
    },
    {
        path: "*",
        name: "404",
        component: NotFound
    },
    {
        path: "/profile",
        name: "Profile",
        component: () =>
            import ('../views/Profile'),
        beforeEnter: (to, from, next) => {
            if (isNullOrUndefined(localStorage.getItem("token"))) {
                next("/account/user/Login");
            } else {
                next();
            }
        }
    },
    {
        path: "/feeds",
        name: "Home",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (isNullOrUndefined(localStorage.getItem("token"))) {
                next("/account/user/Signup");
            } else {
                if (JSON.parse(localStorage.getItem("token")).account.role == "admin") {
                    next();
                } else {
                    next("/404");
                }
            }
        }
    },
    {
        path: "/account/:user/:page?",
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

export default router