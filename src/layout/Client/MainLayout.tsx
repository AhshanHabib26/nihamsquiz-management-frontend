import TopNav from "@/shared/Navbar/TopNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <TopNav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
