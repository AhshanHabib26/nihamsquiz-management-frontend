/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllMcqCategoriesQuery } from "@/redux/features/quiz/mcq/categoryApi";
import { useUploadMcqMutation } from "@/redux/features/quiz/mcq/mcqApi";
import { TResponse } from "@/types";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface UploadQuizProps {
  openDialog: boolean;
  onClose: () => void;
}

interface ICommon {
  id: string;
  name: string;
}

const UploadMcq = ({ openDialog, onClose }: UploadQuizProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quizFile, setQuizFile] = useState<File | null>(null);

  // Fetch all categories
  const {
    data: categoriesData,
    isFetching: isFetching,
    isError: isError,
  } = useGetAllMcqCategoriesQuery("");


  // Memoize categories to avoid unnecessary recalculations
  const categories = useMemo<ICommon[]>(
    () =>
      categoriesData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [categoriesData]
  );

  const [uploadMcq] = useUploadMcqMutation();

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQuizFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quizFile) {
      toast.error("Please upload a mcq file.");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("quizFile", quizFile);
    formData.append("categoryId", selectedCategory);

    try {
      const response = (await uploadMcq(formData)) as TResponse<any>;
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Mcq uploaded successfully!");
        onClose()
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleClose = () => {
    setSelectedCategory("");
    setQuizFile(null);
    onClose();
  };

  return (
    <Dialog open={openDialog} onOpenChange={(open) => open && handleClose()}>
      <DialogContent className="max-w-sm lg:max-w-lg mx-auto rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Upload Quiz
          </h2>
          <DialogClose>
            <X
              size={20}
              className="absolute top-3 right-3 text-red-500 hover:text-red-600"
              onClick={onClose}
            />
          </DialogClose>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogDescription>
              <input
                className="w-full border h-[50px] pt-3 pl-2"
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />

              <div className="my-4">
                {isError && <p>Error loading categories.</p>}
                {isFetching ? (
                  <CategoryLoader />
                ) : (
                  <Select
                    value={selectedCategory || ""}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger
                      className="h-[50px] hind-siliguri-light"
                      aria-label="Category"
                    >
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {isFetching && (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      )}
                      {isError && (
                        <SelectItem value="error" disabled>
                          Error loading categories
                        </SelectItem>
                      )}
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem
                            className="text-lg hind-siliguri-light cursor-pointer"
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="null" disabled>
                          No categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex items-end justify-end mt-3">
                <Button
                  className="bg-BgPrimary hover:bg-BgPrimaryHover"
                  type="submit"
                >
                  Upload Quiz
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMcq;
