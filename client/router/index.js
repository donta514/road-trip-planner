import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import TripDetail from "../components/TripDetail.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.state.user) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/trip/:id",
    name: "TripDetail",
    component: TripDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
