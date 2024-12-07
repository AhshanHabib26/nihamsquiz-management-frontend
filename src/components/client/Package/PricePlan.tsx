import { useDispatch } from "react-redux";
import PackageCard from "./PackageCard";
import Container from "@/lib/Container";
import { useGetAllPackageQuery } from "@/redux/features/package/packageApi";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { IPackage } from "@/types/common.data";

const PricePlan = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAllPackageQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  console.log(data);

  return (
    <div>
      <Container>
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-semibold bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
            Plans and Pricing
          </h1>

          <p className="text-center text-lg max-w-[60ch] text-gray-300 mt-1">
            Select from best plans, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!{" "}
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
            {data?.data?.result?.map((service: IPackage) => (
              <PackageCard
                service={service}
                key={service._id}
                isCheckout={false}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PricePlan;
