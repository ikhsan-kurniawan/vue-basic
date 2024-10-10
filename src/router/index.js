import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/auth/Login.vue";
import Dashboard from "../components/pages/Dashboard.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Universities from "../components/pages/Universities.vue";
import Roles from "../components/pages/Roles.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Login,
            props: true,
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            props: true,
        },
        {
            path: "/helloworld",
            name: "Hello World",
            component: HelloWorld,
            props: true,
        },
        {
            path: "/universities",
            name: "Universities",
            component: Universities,
            props: true,
        },
        {
            path: "/roles",
            name: "Roles",
            component: Roles,
            props: true,
        },
    ],
});

export default router;