import { getAllPackageData } from "@/data/packageData";
import { TPackage } from "@/types/common.data";
import PackageCard from "./PackageCard";
import Container from "@/lib/Container";

const PricePlan = () => {
  const services = getAllPackageData();
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mt-8">
            {services.map((service: TPackage) => (
              <PackageCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PricePlan;
