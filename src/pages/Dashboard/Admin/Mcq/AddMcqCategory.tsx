/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllMcqCategory } from "@/components/dashboard/admin/Mcq/AllMcqCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCreateMcqCategoryMutation, useUpdateMcqCategoryMutation } from "@/redux/features/quiz/mcq/categoryApi";
import { TResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export const AddMcqCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [createMcqCategory] = useCreateMcqCategoryMutation();
  const [updateMcqCategory] = useUpdateMcqCategoryMutation();

  // Handler for creating a category
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!categoryName) {
      return toast.error("MCQ Category name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const mcqCategoryData = { name: categoryName, slug: categorySlug };
    try {
      const res = (await createMcqCategory(mcqCategoryData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("MCQ Category added successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategoryName("");
        setCategorySlug("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  // Handler for updating a category
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!categoryName || categoryId === null) {
      return toast.error("MCQ Category ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const mcqCategoryData = { name: categoryName, slug: categorySlug };

    try {
      const res = (await updateMcqCategory({
        id: categoryId,
        data: mcqCategoryData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("MCQ Category updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategoryName("");
        setCategorySlug("");
        setCategoryId(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  return (
    <div>
      <form onSubmit={categoryId === null ? createHandler : updateHandler}>
        <div className="flex items-center flex-col md:flex-row lg:flex-row max-w-xl mx-auto gap-2 mt-5">
          <Input
            value={categoryName}
            onChange={(e) => {
              const value = e.target.value;
              setCategoryName(value);
              // Automatically update slug based on category name
              setCategorySlug(value.trim().toLowerCase().replace(/ /g, "-"));
            }}
            type="text"
            name="name"
            className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
            placeholder="MCQ Category"
          />

          <Input
            value={categorySlug} // Use value instead of defaultValue
            onChange={(e) => setCategorySlug(e.target.value)} // Allow manual slug modification
            type="text"
            name="slug"
            className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
            placeholder="MCQ Category Slug"
          />

          <div className=" w-full flex items-end justify-end md:items-start md:justify-start lg:items-start lg:justify-start">
            {categoryId === null ? (
              <Button className="h-[45px] bg-blue-500 hover:bg-blue-600">
                Add MCQ Category
              </Button>
            ) : (
              <Button className="h-[45px] bg-green-600 hover:bg-green-500">
                Update MCQ Category
              </Button>
            )}
          </div>
        </div>
      </form>
      <Separator className="mt-5" />
      <div>
        <AllMcqCategory
          onSelectMcqCategory={(id, name, slug) => {
            setCategoryId(id);
            setCategoryName(name);
            setCategorySlug(slug);
          }}
        />
      </div>
    </div>
  );
};
