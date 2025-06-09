import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.js";
import Signup from "./components/signup";
import Verify from "./components/verify_otp";
import Login from "./components/login";
import Home from "./components/Home";
import PropertyDetails from "./components/PropertyDetails.js";
import Listing from "./components/Listing.js";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./components/DashboardHome";
import ListingLayout from "./components/ListingLayout";
import ListingStep1 from "./components/ListingStep1";
import ListingStep2 from "./components/ListingStep2";
import ListingStep3 from "./components/ListingStep3";
import ListingStep4 from "./components/ListingStep4";
import ListingStep5 from "./components/ListingStep5";
import ListingStep6 from "./components/ListingStep6";
import ListingStep7 from "./components/ListingStep7";
import ListingStep8 from "./components/ListingStep8";

import Inbox from "./components/Inbox";
import Bookings from "./components/Bookings";
import Trips from "./components/Trips";
import Favourite from "./components/Favourite";
import Payouts from "./components/Payouts";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import Reviews from "./components/Reviews";
import User_listing from "./components/User_listing";
import Password_reset from "./components/Password_reset";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { path: "", element: <Home /> }, 
      { path: "signup", element: <Signup /> },
      { path: "verify_otp",element:<Verify/>},
      { path: "login", element: <Login /> },
      { path: "property/:id", element: <PropertyDetails /> },
      { path: "reset_pass",element: <Password_reset/>}
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "User_listing", element: <User_listing/>},
      { path: "inbox", element: <Inbox /> },
      { path: "bookings", element: <Bookings /> },
      { path: "trips", element: <Trips /> },
      { path: "favourite", element: <Favourite /> },
      { path: "payouts", element: <Payouts /> },
      { path: "transactions", element: <Transactions /> },
      { path: "profile", element: <Profile /> },
      { path: "reviews", element: <Reviews /> }
    ]
  },
  {
    path: "/dashboard/listings",
    element: <ListingLayout />,
    children: [
      { path: "", element: <ListingStep1 /> },
      { path: "step2", element: <ListingStep2 /> },
      { path: "step3", element: <ListingStep3 /> },
      { path: "step4", element: <ListingStep4 /> },
      { path: "step5", element: <ListingStep5 /> },
      { path: "step6", element: <ListingStep6 /> },
      { path: "step7", element: <ListingStep7 /> },
      { path: "step8", element: <ListingStep8 /> }
    ]
  },
  {
    path: "*",
    element: <h2>404 - Page Not Found</h2>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
