import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    meta: {
      layout: "BlankLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token-access");

  //Private routes
  if (token) {
    if (to.name == "Login") {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    //Public routes
    if (to.meta.layout) {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});

export default router;
