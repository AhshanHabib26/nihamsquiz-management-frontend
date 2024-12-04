import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HardDrive } from "lucide-react";
import { PaginationCard } from "@/lib/PaginationCard";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { TUser } from "@/redux/features/auth/authSlice";
import SearchBtn from "@/components/client/SearchBtn";
import { Separator } from "@/components/ui/separator";

export default function UserPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllUsersQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;
  const [searchText, setSearchText] = useState("");

  // Filter the posts based on searchText
  const filteredUser = data?.data?.filter(
    (user: TUser) =>
      user?.fullname?.toLowerCase().includes(searchText.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const renderTableRows = () => {
    return (searchText ? filteredUser : data?.data)?.map((user) => (
      <TableRow key={user?._id}>
        <TableCell>
          <h1>{user?.fullname}</h1>
        </TableCell>
        <TableCell>
          <h1>{user?.email}</h1>
        </TableCell>
        <TableCell>
          <h1>{user.role}</h1>
        </TableCell>
        <TableCell>
          <p>{moment(user?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Button size="sm" className=" bg-red-500 hover:bg-red-600">
            Block
          </Button>
          <Button size="sm" className=" bg-blue-500 hover:bg-blue-600">
            Edit
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">All User</h1>
        <SearchBtn setSearchText={setSearchText} inputBelow={null} />
      </div>
      <div>
        <Separator className=" mt-5"/>
      </div>
      <div>
        {data?.data?.length === 0 || filteredUser?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No User Found!</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            {filteredUser?.length === limit ? (
              <div className="my-5 flex items-end justify-end">
                <PaginationCard
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
