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

console.log(data)

  return <div>UHomePage</div>;
};

export default UHomePage;
