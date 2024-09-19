import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import { getLanguage } from "@/composables/useLanguage";

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
      import(/* webpackChunkName: "Login" */ "../views/LoginView.vue"),
    meta: {
      layout: "BlankLayout",
    },
  },
  {
    path: "/clients",
    name: "clients",
    component: () =>
      import(/* webpackChunkName: "providers" */ "../views/ProviderView.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/items",
    name: "items",
    component: () =>
      import(/* webpackChunkName: "items" */ "../views/ItemsView.vue"),
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
  getLanguage();
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
