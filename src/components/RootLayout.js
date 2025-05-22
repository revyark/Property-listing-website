import { Outlet } from "react-router-dom";
import Navi from "./Navigation";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <div>
      <Navi />
      <Outlet /> {/* All routed content shows here */}
      <Footer />
    </div>
  );
}
