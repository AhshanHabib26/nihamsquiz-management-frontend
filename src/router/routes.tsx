import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/Client/MainLayout";
import HomePage from "../pages/Client/Home";
import LoginPage from "../pages/Client/Login";
import RegisterPage from "../pages/Client/Register";
import ProtectedRoute from "@/layout/ProtectedRoute";
import DHomePage from "@/pages/Dashboard/DHome";
import AdminDashboardLayout from "@/layout/Dashboard/Admin/AdminDashboardLayout";
import UserDashboardLayout from "@/layout/Dashboard/User/UserDashboardLayout";
import BlogPage from "@/pages/Client/Blog";
import QuizPage from "@/pages/Client/Quiz/Quiz";
import PricePlanPage from "@/pages/Client/PricePlan";
import AboutUsPage from "@/pages/Client/AboutUs";
import CategoryPage from "@/pages/Client/Category";
import LabelPage from "@/pages/Client/Label";
import QuizCategoryPage from "@/pages/Client/Quiz/QuizCategory";
import QuizLabelPage from "@/pages/Client/Quiz/QuizLabel";
import QuizDetails from "@/pages/Client/Quiz/QuizDetails";
import QuizSubmissionPage from "@/pages/Client/Quiz/QuizSubmission";
import BlogDetailsPage from "@/pages/Client/BlogDetailsPage";
import { PostPage } from "@/pages/Dashboard/Admin/Blog/Post";
import { CreatePostPage } from "@/pages/Dashboard/Admin/Blog/CreatePost";
import { AddCategoryPage } from "@/pages/Dashboard/Admin/Blog/AddCategory";
import { CommentPage } from "@/pages/Dashboard/Admin/Comment";
import { AllQuizPage } from "@/pages/Dashboard/Admin/Quiz/Quiz";
import { CreateQuizPage } from "@/pages/Dashboard/Admin/Quiz/CreateQuiz";
import { CreateQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/CreateCategory";
import { AllQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/Category";
import UserPage from "@/pages/Dashboard/Admin/User";
import ProfilePage from "@/pages/Dashboard/Admin/Profile";
import ChangePasswordPage from "@/pages/Dashboard/Admin/ChangePassword";
import UHomePage from "@/pages/Dashboard/UHome";
import PlanPage from "@/pages/Dashboard/Admin/Plan/Plan";
import CreatePlanPage from "@/pages/Dashboard/Admin/Plan/CreatePlan";
import CheckoutPage from "@/pages/Client/Checkout";
import SubscribePage from "@/pages/Dashboard/Admin/Plan/Subscribe";
import { UPostPage } from "@/pages/Dashboard/User/Blog/Post";
import UQuizPage from "@/pages/Dashboard/User/Quiz/UQuiz";
import UCommentPage from "@/pages/Dashboard/User/Comment/Comment";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetailsPage />,
      },
      {
        path: "/blog/category/:id",
        element: <CategoryPage />,
      },
      {
        path: "/blog/label/:tag",
        element: <LabelPage />,
      },
      {
        path: "/quiz/category/:id",
        element: <QuizCategoryPage />,
      },
      {
        path: "/quiz/label/:tag",
        element: <QuizLabelPage />,
      },
      {
        path: "/quiz/quiz-details/:id",
        element: <QuizDetails />,
      },
      {
        path: "/quiz/quiz-submission/:id",
        element: <QuizSubmissionPage />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/price-plan",
        element: <PricePlanPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
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
      {
        path: "all-post",
        element: <PostPage />,
      },
      {
        path: "create-post",
        element: <CreatePostPage />,
      },
      {
        path: "create-post/:id",
        element: <CreatePostPage />,
      },
      {
        path: "post-category",
        element: <AddCategoryPage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
      },
      {
        path: "all-quiz",
        element: <AllQuizPage />,
      },
      {
        path: "create-quiz",
        element: <CreateQuizPage />,
      },
      {
        path: "create-quiz/:id",
        element: <CreateQuizPage />,
      },
      {
        path: "create-quiz-category",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "create-quiz-category/:id",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "quiz-category",
        element: <AllQuizCategoryPage />,
      },
      {
        path: "all-user",
        element: <UserPage />,
      },
      {
        path: "package",
        element: <PlanPage />,
      },
      {
        path: "create-package",
        element: <CreatePlanPage />,
      },
      {
        path: "subscriber",
        element: <SubscribePage />,
      },
      {
        path: "create-package/:id",
        element: <CreatePlanPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
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
        element: <UHomePage />,
      },
      {
        path: "all-post",
        element: <UPostPage />,
      },
      {
        path: "quiz",
        element: <UQuizPage />,
      },
      {
        path: "comment",
        element: <UCommentPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
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
