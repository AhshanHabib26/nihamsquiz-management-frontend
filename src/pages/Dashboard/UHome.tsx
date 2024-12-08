import Notification from "@/components/dashboard/user/Notification/Notification";
import UHomeCard from "@/components/dashboard/user/UHome/UHomeCard";
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UHomePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div>
        <Notification user={data?.data} />
        <UHomeCard user={data?.data} />
      </div>
    </div>
  );
};

export default UHomePage;
