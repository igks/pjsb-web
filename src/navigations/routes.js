import UserGrid from "pages/user/UserGrid";
import Dashboard from "pages/main/Dashboard";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    private: true,
  },
  { path: "/user", component: UserGrid, private: true },
];

export default routes;
