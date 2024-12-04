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
      icon: <UserRound size={30} className="text-blue-500" />,
      bColor: "bg-blue-500",
      tColor: "text-blue-500",
      label: "Total User",
    },
    {
      count: data?.data?.postCount,
      icon: <FaBook size={30} className="text-cyan-500" />,
      bColor: "bg-cyan-500",
      tColor: "text-cyan-500",
      label: "Total Blog Post",
    },
    {
      count: data?.data?.postCategoryCount,
      icon: <Layers2 size={30} className="text-red-500" />,
      bColor: "bg-red-500",
      tColor: "text-red-500",
      label: "Total Blog Category",
    },
    {
      count: data?.data?.quizCount,
      icon: <FileQuestion size={30} className="text-green-500" />,
      bColor: "bg-green-500",
      tColor: "text-green-500",
      label: "Total Quiz",
    },
    {
      count: data?.data?.quizCategoryCount,
      icon: <Layers2 size={30} className="text-orange-500" />,
      bColor: "bg-orange-500",
      tColor: "text-orange-500",
      label: "Total Quiz Category",
    },
    {
      count: data?.data?.commentCount,
      icon: <MessageCircle size={30} className="text-emerald-500" />,
      bColor: "bg-emerald-500",
      tColor: "text-emerald-500",
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
            bColor={card.bColor}
            label={card.label}
            tColor={card.tColor}
          />
        ))}
      </div>
    </Container>
  );
};

export default DCountInfo;
