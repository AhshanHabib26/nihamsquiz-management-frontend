import DCountInfo from "@/components/dashboard/admin/DHome/DCountInfo";
import DDailyBlogInfo from "@/components/dashboard/admin/DHome/DDailyBlogInfo";
import DSection from "@/components/dashboard/admin/DHome/DSection";
import Notification from "@/components/dashboard/user/Notification/Notification";
import Container from "@/lib/Container";
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DHomePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-3">
      <Container>
        <Notification user={data?.data} />
      </Container>
      <DSection title="All Info">
        <DCountInfo />
      </DSection>

      <DSection title="Daily Blog Posts">
        <DDailyBlogInfo />
      </DSection>
    </div>
  );
};

export default DHomePage;
