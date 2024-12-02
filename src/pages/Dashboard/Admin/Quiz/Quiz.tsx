/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizCard } from "@/components/dashboard/admin/Quiz/QuizCard";
import { Separator } from "@/components/ui/separator";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import {
  useDeleteQuizMutation,
  useGetAllQuizQuery,
} from "@/redux/features/quiz/quiz/quizApi";
import { TResponse } from "@/types";
import { TQuiz } from "@/types/common.data";
import { HardDrive, ListPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const AllQuizPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 6;
  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;
  const [deleteQuiz] = useDeleteQuizMutation();

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this quiz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the quiz is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteQuiz(id)) as TResponse<any>;

        if (res.error) {
          Swal.fire({
            title: "Error!",
            text: res.error.data.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Quiz deleted successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? `Error: ${err.message}`
            : "Something went wrong";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "Quiz deletion was cancelled",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="flex items-end justify-end mt-5">
        <Link
          to="/admin/dashboard/create-quiz"
          className="flex items-center bg-BgPrimary text-white px-4 py-3 gap-2 rounded-lg text-md"
        >
          <ListPlus />
          Create Quiz
        </Link>
      </div>
      <div>
        <Separator className="my-5" />

        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Quiz Found</h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {data?.data?.map((quiz: TQuiz) => (
                <QuizCard
                  quiz={quiz}
                  key={quiz._id}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
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
