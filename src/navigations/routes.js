import Dashboard from "pages/main/Dashboard";
import UserGrid from "pages/user/UserGrid";
import UserForm from "pages/user/UserForm";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    private: true,
  },
  { path: "/user", component: UserGrid, private: true },
  { path: "/user-form", component: UserForm, private: true },
];

export default routes;
