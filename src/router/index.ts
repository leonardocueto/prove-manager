import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    meta: {
      layout: "BlankLayout",
    },
  },
  {
    path: "/client",
    name: "client",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ClientView.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token-ac");

  //Private routes
  if (token) {
    if (to.name == "login") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    //Public routes
    if (to.meta.layout) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});

export default router;
