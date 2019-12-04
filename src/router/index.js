import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginSignup.vue";
import NotFound from "../views/404.vue";
import { isNullOrUndefined } from "util";
// import loadGoogleCharts from './../lib/google-charts-loader'


// // Install the components
// export function install(Vue) {
//   Vue.component('Home', Home)
// }

// // Expose the components
// export {
//   loadGoogleCharts,
//   Home
// }
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "*",
        name: "404",
        component: NotFound
    },

    {
        path: "/analytics",
        name: "analytics",
        component: () =>
            import ('../views/Analytics')
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