import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/Home"; // This will hold your homepage content
import PropertyDetails from "./components/PropertyDetails.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Navi + <Outlet />
    children: [
      { path: "", element: <Home /> }, // Homepage content
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
       { path: "property/:id", element: <PropertyDetails /> } 
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
