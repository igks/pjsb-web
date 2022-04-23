import Dashboard from "pages/main/Dashboard";
import UserGrid from "pages/user/UserGrid";
import UserForm from "pages/user/UserForm";
import Subject from "pages/subject/Subject";
import ClassContent from "pages/subject/ClassContent";
import SubjectForm from "pages/subject/SubjectForm";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    private: true,
  },
  { path: "/user", component: UserGrid, private: true },
  { path: "/user-form", component: UserForm, private: true },
  { path: "/subject", component: Subject, private: true },
  { path: "/content", component: ClassContent, private: true },
  { path: "/subject-form", component: SubjectForm, private: true },
];

export default routes;
