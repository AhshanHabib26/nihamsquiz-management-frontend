import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/Client/MainLayout";
import HomePage from "../pages/Client/Home";
import LoginPage from "../pages/Client/Login";
import RegisterPage from "../pages/Client/Register";
import ProtectedRoute from "@/layout/ProtectedRoute";
import DHomePage from "@/pages/Dashboard/DHome";
import AdminDashboardLayout from "@/layout/Dashboard/Admin/AdminDashboardLayout";
import UserDashboardLayout from "@/layout/Dashboard/User/UserDashboardLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <DHomePage />,
      },
      // {
      //   path: "all-post",
      //   element: <PostPage />,
      // },
      // {
      //   path: "create-post",
      //   element: <CreatePostPage />,
      // },
      // {
      //   path: "create-post/:id",
      //   element: <CreatePostPage />,
      // },
      // {
      //   path: "post-category",
      //   element: <AddCategoryPage />,
      // },
      // {
      //   path: "comments",
      //   element: <CommentPage />,
      // },
      // {
      //   path: "all-quiz",
      //   element: <AllQuizPage />,
      // },
      // {
      //   path: "create-quiz",
      //   element: <CreateQuizPage />,
      // },
      // {
      //   path: "create-quiz/:id",
      //   element: <CreateQuizPage />,
      // },
      // {
      //   path: "create-category",
      //   element: <CreateQuizCategoryPage />,
      // },
      // {
      //   path: "create-category/:id",
      //   element: <CreateQuizCategoryPage />,
      // },
      // {
      //   path: "quiz-category",
      //   element: <AllQuizCategoryPage />,
      // },
      // {
      //   path: "all-user",
      //   element: <UserPage />,
      // },
      // {
      //   path: "analytics",
      //   element: <AnalyticsPage />,
      // },
    ],
  },

  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/user/dashboard",
        element: <DHomePage />,
      },
      // {
      //   path: "all-post",
      //   element: <PostPage />,
      // },
      // {
      //   path: "create-post",
      //   element: <CreatePostPage />,
      // },
      // {
      //   path: "create-post/:id",
      //   element: <CreatePostPage />,
      // },
      // {
      //   path: "post-category",
      //   element: <AddCategoryPage />,
      // },
      // {
      //   path: "comments",
      //   element: <CommentPage />,
      // },
      // {
      //   path: "all-quiz",
      //   element: <AllQuizPage />,
      // },
      // {
      //   path: "create-quiz",
      //   element: <CreateQuizPage />,
      // },
      // {
      //   path: "create-quiz/:id",
      //   element: <CreateQuizPage />,
      // },
      // {
      //   path: "create-category",
      //   element: <CreateQuizCategoryPage />,
      // },
      // {
      //   path: "create-category/:id",
      //   element: <CreateQuizCategoryPage />,
      // },
      // {
      //   path: "quiz-category",
      //   element: <AllQuizCategoryPage />,
      // },
      // {
      //   path: "all-user",
      //   element: <UserPage />,
      // },
      // {
      //   path: "analytics",
      //   element: <AnalyticsPage />,
      // },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
