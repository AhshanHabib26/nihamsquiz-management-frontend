import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DSidebar } from "./DSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
const AdminDashboardLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="text-gray-950">
      <SidebarProvider>
        <DSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b mr-5">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div>
                <h1 className="text-lg font-medium">
                  Welcome to{" "}
                  <span className="text-TextPrimary">
                    {user?.userName ?? "Guest"}
                  </span>
                </h1>
                <span className=" uppercase text-gray-600">{user?.role}</span>
              </div>
            </div>
            <div>
              <Button
                onClick={handleLogout}
                className=" bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          </header>

          <div className="px-5">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboardLayout;
