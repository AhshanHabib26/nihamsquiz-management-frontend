/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLoader } from "@/loader/DashboardLoader";
import {
  useCreatePackageMutation,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "@/redux/features/package/packageApi";
import { TResponse } from "@/types";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Service {
  serviceTitle: string;
  serviceValue: string;
}

interface FormData {
  title: string;
  price: string;
  offerPrice: string;
  isOfferActive: boolean;
  packageType: string;
  service: Service[];
}

const CreatePlanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    offerPrice: "",
    isOfferActive: false,
    packageType: "",
    service: [{ serviceTitle: "", serviceValue: "0" }],
  });

  // API hooks
  const { data: packageData, isFetching: isFetchingPackages } =
    useGetSinglePackageQuery(id);

  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();

  useEffect(() => {
    if (packageData?.data?.result) {
      setFormData({
        title: packageData?.data?.result?.title || "",
        price: packageData?.data?.result?.price || "",
        offerPrice: packageData?.data?.result?.offerPrice || "",
        isOfferActive: packageData?.data?.result?.isOfferActive || false,
        packageType: packageData?.data?.result?.packageType || "",
        service: packageData?.data?.result?.service || [
          { serviceTitle: "", serviceValue: "0" },
        ],
      });
    }
  }, [packageData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (
    index: number,
    key: keyof Service,
    value: string
  ) => {
    setFormData((prev) => {
      // Create a deep copy of the `service` array
      const updatedServices = [...prev.service];

      // Create a new object for the specific service to avoid mutation
      const updatedService = { ...updatedServices[index], [key]: value };

      // Replace the updated service in the array
      updatedServices[index] = updatedService;

      return { ...prev, service: updatedServices };
    });
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      service: [...prev.service, { serviceTitle: "", serviceValue: "0" }],
    }));
  };

  const removeService = (index: number) => {
    if (formData.service.length > 1) {
      setFormData((prev) => ({
        ...prev,
        service: prev.service.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || formData.service.length === 0) {
      return toast.error("All input values are required!");
    }

    const action = id ? "Updating" : "Creating";
    const toastId = toast.loading(`${action} package...`);

    try {
      const response = id
        ? ((await updatePackage({ id, data: formData })) as TResponse<any>)
        : ((await createPackage(formData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          id
            ? "Package updated successfully!"
            : "Package created successfully!",
          { id: toastId }
        );
        navigate("/admin/dashboard/package");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-semibold mb-3 text-gray-700">
        {id ? "Update Package" : "Create Package"}
      </h1>
      {isFetchingPackages ? (
        <DashboardLoader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="title"
            className="h-[50px]"
            placeholder="Package Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <div className=" grid grid-cols-2 lg:grid-cols-3 gap-3">
            <Input
              name="price"
              className="h-[50px]"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <Input
              name="offerPrice"
              className="h-[50px]"
              placeholder="Offer Price"
              value={formData.offerPrice}
              onChange={handleInputChange}
            />
            <Input
              name="packageType"
              className="h-[50px]"
              placeholder="Package Type"
              value={formData.packageType}
              onChange={handleInputChange}
            />
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isOfferActive"
              checked={formData.isOfferActive}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  isOfferActive: !prev.isOfferActive,
                }))
              }
            />
            <span className="text-lg font-medium text-gray-700">
              Is Offer Active
            </span>
          </label>

          <h4 className="text-xl font-semibold mb-3 text-gray-700">Services</h4>
          {formData?.service?.map((service, index) => (
            <div
              key={index}
              className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
            >
              <Input
                placeholder="Service Title"
                className="h-[50px]"
                value={service.serviceTitle}
                onChange={(e) =>
                  handleServiceChange(index, "serviceTitle", e.target.value)
                }
              />
              <Input
                placeholder="Service Value"
                className="h-[50px]"
                value={service.serviceValue}
                onChange={(e) =>
                  handleServiceChange(index, "serviceValue", e.target.value)
                }
              />
              {formData.service.length > 1 && index > 0 && (
                <Button
                  type="button"
                  className="w-[50px] h-[40px]"
                  variant="destructive"
                  onClick={() => removeService(index)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
          <div className="flex items-end justify-end">
            <Button
              className=" bg-green-600 hover:bg-green-700 h-[40px] text-lg font-light"
              type="button"
              onClick={addService}
            >
              Add New Service
            </Button>
          </div>

          <Button
            className=" bg-BgPrimary hover:bg-BgPrimaryHover h-[45px] text-lg font-light"
            type="submit"
          >
            {id ? "Update Package" : "Create Package"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CreatePlanPage;
