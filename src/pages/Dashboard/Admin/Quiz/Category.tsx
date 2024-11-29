/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import {
  useDeleteQuizCategoryMutation,
  useGetAllQuizCategoriesQuery,
} from "@/redux/features/quiz/category/categoryApi";
import { TResponse } from "@/types";
import { Eye, HardDrive, ListPlus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AllQuizCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllQuizCategoriesQuery({ page, limit }, {
    refetchOnMountOrArgChange: false, 
  });
  const total = data?.meta?.total ?? 0;
  const [deleteCategory] = useDeleteQuizCategoryMutation();

  const deleteHandler = async (id: string) => {
    const toastId = toast.loading("Deleting...");

    try {
      const res = (await deleteCategory(id)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Category deleted successfully", {
          id: toastId,
          duration: 1000,
        });
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? `Error: ${err.message}` : "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 1500 });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/create-category/${id}`);
  };

  const renderTableRows = () => {
    return data?.data?.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <img src={item.imageUrl} className="w-8" />
            {item.name}
          </div>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Eye size={20} color="#363636" />
          <SquarePen
            onClick={() => handleEdit(item._id)}
            size={20}
            color="green"
          />
          <Trash2
            onClick={() => deleteHandler(item._id)}
            size={20}
            color="red"
          />
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="flex items-end justify-end">
        <Link
          to="/dashboard/create-category"
          className="flex items-center bg-black text-white px-4 py-3 gap-2 rounded-lg text-md"
        >
          <ListPlus />
          Add Category
        </Link>
      </div>
      <div>
        <Separator className="my-5" />
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Category Found</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            <div className="my-5">
              <PaginationCard
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
