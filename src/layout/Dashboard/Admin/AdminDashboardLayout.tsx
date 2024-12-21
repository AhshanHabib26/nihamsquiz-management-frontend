import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DSidebar } from "./DSidebar";
import { useAppSelector } from "@/redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import diamondImg from "../../../assets/icons/diamond.png"
export default function AdminDashboardLayout() {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>(null);
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

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
      setIcon(<FaSun className="text-yellow-500" />);
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
      setIcon(<FaSun className="text-orange-500" />);
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good evening");
      setIcon(<FaMoon className="text-blue-500" />);
    } else {
      setGreeting("Good night");
      setIcon(<FaMoon className="text-gray-500" />);
    }
  }, []);

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
                <div className="flex items-center gap-1">
                  <p className="uppercase text-gray-600">{user?.role}</p>
                  <span className="text-gray-600">|</span>
                  <p className="text-gray-600">{greeting}</p>
                  {icon}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${data?.data?.totalPoints === 0 ? "bg-red-500" : "bg-green-500"} px-2 py-1 rounded-md`}>
                <img src={diamondImg} alt="" className=" size-6" />
                <p className="text-xl font-semibold text-gray-100">{data?.data?.totalPoints ?? 0}</p>
              </div>
              <Button onClick={handleLogout} className=" text-lg font-light bg-red-600 hover:bg-red-700">Logout</Button>
            </div>
          </header>
          <div className="px-5">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
