import { Link, useNavigate } from "react-router-dom";
import { packageIconGeneretor } from "./PackageIconGeneretor";
import { TPackageProps } from "@/types/common.data";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const PackageCard: React.FC<TPackageProps> = ({ service, isCheckout }) => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const handleEnrollClick = (serviceId: string) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/checkout?id=${serviceId}`);
    }
  };

  return (
    <div className=" shadow-md bg-gray-900">
      <h1 className="p-2 bg-gray-800 text-center text-xl hind-siliguri-regular text-white">
        {service?.title}
      </h1>
      <div className="flex items-center justify-center my-2">
        <p className="text-lg hind-siliguri-light mr-2">প্যাকেজ মূল্য : </p>
        <div className="flex items-center">
          <p className="text-lg hind-siliguri-light mr-2">টাকা</p>
          <h1 className="text-xl hind-siliguri-light line-through text-red-500">
            {service?.price}
          </h1>
        </div>
        <div className="flex items-center">
          <h1
            className={`text-2xl ml-2 hind-siliguri-bold ${
              service?.title === "বেসিক"
                ? "text-orange-500"
                : service?.title === "প্লাস"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {service?.offerPrice}
          </h1>
          <p className="text-lg hind-siliguri-regular ml-1">
            {" "}
            {service?.packageType === "Month"
              ? "/ মাস"
              : service?.packageType === "Yearly"
              ? "/ বার্ষিক"
              : "/ লাইফটাইম"}{" "}
          </p>
        </div>
      </div>
      <hr className="border-[0.5] border-gray-700 border-dashed" />
      <div className="p-2 mt-3">
        {service?.service?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mb-2">{packageIconGeneretor()}</span>
              <p className="text-[17px] hind-siliguri-light ml-2 mb-2">
                {item?.serviceTitle}
              </p>
            </div>
            <div>
              <span className="text-sm font-extralight bg-gray-800 px-3 rounded-md ">
                {item?.serviceValue}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
        {isCheckout ? (
          <div>
            {service?.title === "বেসিক" ? (
              <Link
                className="bg-orange-500 hover:bg-orange-600 inline-block w-full text-center text-lg hind-siliguri-regular text-white p-2 rounded-md"
                to="/price-plan"
              >
                অন্য প্যাকেজ দেখুন
              </Link>
            ) : service?.title === "প্লাস" ? (
              <Link
                className="bg-blue-500 hover:bg-blue-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
                to="/price-plan"
              >
                অন্য প্যাকেজ দেখুন
              </Link>
            ) : (
              <Link
                className="bg-green-500 hover:bg-green-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
                to="/price-plan"
              >
                অন্য প্যাকেজ দেখুন
              </Link>
            )}
          </div>
        ) : (
          <div>
            {service?.title === "বেসিক" ? (
              <button
                className="bg-orange-500 hover:bg-orange-600 inline-block w-full text-center text-lg hind-siliguri-regular text-white p-2 rounded-md"
                onClick={() => handleEnrollClick(service._id)}
              >
                এনরোল বেসিক
              </button>
            ) : service?.title === "প্লাস" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
                onClick={() => handleEnrollClick(service._id)}
              >
                এনরোল প্লাস
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
                onClick={() => handleEnrollClick(service?._id)}
              >
                এনরোল প্রিমিয়াম
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
