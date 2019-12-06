import Vue from "vue";
import VueRouter from "vue-router";
import Analytics from "../views/Analytics.vue";
import Home from "../views/Home.vue";
import UserSignUp from "../views/UserSignUp.vue";
import Login from "../views/LoginSignup.vue";
import NotFound from "../views/404.vue";
import { isNullOrUndefined } from "util";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: {
        path: isNullOrUndefined(localStorage.getItem("token"))?'/analytics/':"/user/account/Signup"
    }
}, {
    path: "/analytics/:token?",
    name: "home",
    component: Analytics,
    beforeEnter: (to, from, next) => {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/user/account/Signup");
        } else {
            if (JSON.parse(localStorage.getItem("token")).account.role == "admin") {
                next();
            } else {
                next("/user");
            }
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
    component: () =>
        import('../views/Profile'),
    beforeEnter: (to, from, next) => {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/user/account/Signup");
        } else {
            next();
        }
    }
},
{
    path: "/user/account/:page?",
    component: UserSignUp,
    beforeEnter: (to, from, next) => {
        if (!isNullOrUndefined(localStorage.getItem("token"))) {
            next("/user/");
        } else {
            next();
        }
    }
},
{
    path: "/user",
    component: Home,
    beforeEnter: (to, from, next) => {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/user/account/Signup");
        } else {
            next();
        }
    }
},
{
    path: "/admin/account/:page?",
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