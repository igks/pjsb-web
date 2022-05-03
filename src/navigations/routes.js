import Dashboard from "pages/main/Dashboard";
import UserGrid from "pages/user/UserGrid";
import UserForm from "pages/user/UserForm";
import Subject from "pages/subject/Subject";
import ClassContent from "pages/subject/ClassContent";
import SubjectForm from "pages/subject/SubjectForm";
import ContentDetail from "pages/subject/SubjectDetail";
import SubjectDetailForm from "pages/subject/SubjectDetailForm";
import VideoPreview from "pages/subject/VideoPreview";

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
  { path: "/content-details", component: ContentDetail, private: true },
  { path: "/subject-detail-form", component: SubjectDetailForm, private: true },
  { path: "/video-preview", component: VideoPreview, private: true },
];

export default routes;
