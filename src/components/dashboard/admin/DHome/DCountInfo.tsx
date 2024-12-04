import Container from "@/lib/Container";
import { useGetAllDashboardCountsQuery } from "@/redux/features/dashboard/dashboardApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { FileQuestion, Layers2, MessageCircle, UserRound } from "lucide-react";
import { useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import DCountInfoCard from "./DCountInfoCard";

const DCountInfo = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllDashboardCountsQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const cardData = [
    {
      count: data?.data?.userCount,
      icon: <UserRound size={40} className="text-blue-500" />,
      color: "blue",
      label: "Total User",
    },
    {
      count: data?.data?.postCount,
      icon: <FaBook size={40} className="text-cyan-500" />,
      color: "cyan",
      label: "Total Blog Post",
    },
    {
      count: data?.data?.postCategoryCount,
      icon: <Layers2 size={40} className="text-red-500" />,
      color: "red",
      label: "Total Blog Category",
    },
    {
      count: data?.data?.quizCount,
      icon: <FileQuestion size={40} className="text-green-500" />,
      color: "green",
      label: "Total Quiz",
    },
    {
      count: data?.data?.quizCategoryCount,
      icon: <Layers2 size={40} className="text-orange-500" />,
      color: "orange",
      label: "Total Quiz Category",
    },
    {
      count: data?.data?.commentCount,
      icon: <MessageCircle size={40} className="text-emerald-500" />,
      color: "emerald",
      label: "Total Comments",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cardData.map((card, index) => (
          <DCountInfoCard
            key={index}
            count={card.count}
            icon={card.icon}
            color={card.color}
            label={card.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default DCountInfo;
