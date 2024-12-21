import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { USidebar } from "./USidebar";
import diamondImg from "../../../assets/icons/diamond.png"
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useAppSelector } from "@/redux/hooks";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);


  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="text-gray-950">
      <SidebarProvider>
        <USidebar />
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
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${ data?.data?.totalPoints === 0 ? "bg-red-500" : "bg-green-500"} px-2 py-1 rounded-md`}>
                <img src={diamondImg} alt="" className=" size-6" />
                <p className="text-xl font-semibold text-gray-100">{data?.data?.totalPoints ?? 0}</p>
              </div>
              <Button onClick={handleLogout} className=" text-lg font-light bg-red-600 hover:bg-red-700">Logout</Button>
            </div>
          </header>

          <div className="p-5">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default UserDashboardLayout;
