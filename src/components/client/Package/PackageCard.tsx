import { Link } from "react-router-dom";
import { packageIconGeneretor } from "./PackageIconGeneretor";
import { TPackageProps } from "@/types/common.data";

const PackageCard: React.FC<TPackageProps> = ({ service }) => {
  return (
    <div className=" shadow-md bg-gray-900">
      <h1 className="p-2 bg-gray-800 text-center text-xl hind-siliguri-regular text-white">
        {service.title}
      </h1>
      <div className="flex items-center justify-center my-2">
        <p className="text-lg hind-siliguri-light mr-2">প্যাকেজ মূল্য : </p>
        <div className="flex items-center">
          <p className="text-lg hind-siliguri-light mr-2">টাকা</p>
          <h1 className="text-2xl hind-siliguri-light line-through text-red-500">
            {service?.price}
          </h1>
        </div>
        <div className="flex items-center">
          <h1
            className={`text-3xl ml-2 hind-siliguri-bold ${
              service?.altTitle === "Basic"
                ? "text-orange-500"
                : service.altTitle === "Plus"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {service?.offerPrice}
          </h1>
          <p className="text-lg hind-siliguri-regular ml-1"> / মাস</p>
        </div>
      </div>
      <hr className="border-[0.5] border-gray-700 border-dashed" />
      <div className="p-2 mt-3">
        {service?.service?.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mb-2">{packageIconGeneretor(service?.altTitle, index)}</span>
            <p className="text-lg hind-siliguri-light ml-2 mb-2">{item}</p>
          </div>
        ))}
      </div>
      <div className="p-3">
        {service?.altTitle === "Basic" ? (
          <Link
            className="bg-orange-500 hover:bg-orange-600 inline-block w-full text-center text-lg hind-siliguri-regular text-white p-2 rounded-md"
            to="/"
          >
            এনরোল বেসিক
          </Link>
        ) : service?.altTitle === "Plus" ? (
          <Link
            className=" bg-blue-500 hover:bg-blue-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
            to="/"
          >
            এনরোল প্লাস
          </Link>
        ) : (
          <Link
            className="bg-green-500 hover:bg-green-600 inline-block w-full text-center text-lg rounded-md hind-siliguri-regular text-white p-2"
            to="/"
          >
            এনরোল প্রিমিয়াম
          </Link>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
