import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import FindFishing from "../pages/find-fishing/page";
import FisheryLakeDetail from "../pages/fishery/lake/page";
import DemoLandingPage from "../pages/demo/DemoLanding/page";
import DemoRequestPage from "../pages/demo/DemoRequest/page";
import DemoThankYouPage from "../pages/demo/DemoThankYou/page";
import DemoAccessPage from "../pages/demo/DemoAccess/page";
import DemoPublicLakePage from "../pages/demo/DemoPublicLake/page";
import DemoBookingFlowPage from "../pages/demo/DemoBookingFlow/page";
import DemoOwnerDashboardPage from "../pages/demo/DemoOwnerDashboard/page";
import DemoCalendarPage from "../pages/demo/DemoCalendar/page";
import DemoSwimMapPage from "../pages/demo/DemoSwimMap/page";
import DemoBailiffPage from "../pages/demo/DemoBailiff/page";
import DemoMemberPage from "../pages/demo/DemoMember/page";
import DemoLocalServicesPage from "../pages/demo/DemoLocalServices/page";
import DemoRequestsAdminPage from "../pages/demo/SuperAdmin/page";
import SignupPage from "../pages/auth/Signup/page";
import LoginPage from "../pages/auth/Login/page";
import AuthCallbackPage from "../pages/auth/AuthCallback/page";
import MemberOnboardingPage from "../pages/member/Onboarding/page";
import MemberDashboardPage from "../pages/member/Dashboard/page";
import AccountProfilePage from "../pages/member/AccountProfile/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/find-fishing",
    element: <FindFishing />,
  },
  {
    path: "/fishery/:fisherySlug/lake/:lakeSlug",
    element: <FisheryLakeDetail />,
  },
  {
    path: "/lake/:lakeSlug",
    element: <FisheryLakeDetail />,
  },
  {
    path: "/demo",
    element: <DemoLandingPage />,
  },
  {
    path: "/demo/request",
    element: <DemoRequestPage />,
  },
  {
    path: "/demo/thank-you",
    element: <DemoThankYouPage />,
  },
  {
    path: "/demo/access/:token",
    element: <DemoAccessPage />,
  },
  {
    path: "/demo/access/:token/public-lake",
    element: <DemoPublicLakePage />,
  },
  {
    path: "/demo/access/:token/booking-flow",
    element: <DemoBookingFlowPage />,
  },
  {
    path: "/demo/access/:token/owner-dashboard",
    element: <DemoOwnerDashboardPage />,
  },
  {
    path: "/demo/access/:token/calendar",
    element: <DemoCalendarPage />,
  },
  {
    path: "/demo/access/:token/swim-map-builder",
    element: <DemoSwimMapPage />,
  },
  {
    path: "/demo/access/:token/bailiff-dashboard",
    element: <DemoBailiffPage />,
  },
  {
    path: "/demo/access/:token/member-dashboard",
    element: <DemoMemberPage />,
  },
  {
    path: "/demo/access/:token/local-services",
    element: <DemoLocalServicesPage />,
  },
  {
    path: "/admin/demo-requests",
    element: <DemoRequestsAdminPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallbackPage />,
  },
  {
    path: "/member/onboarding",
    element: <MemberOnboardingPage />,
  },
  {
    path: "/member/dashboard",
    element: <MemberDashboardPage />,
  },
  {
    path: "/account/profile",
    element: <AccountProfilePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;