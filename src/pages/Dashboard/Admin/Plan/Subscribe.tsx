/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useActiveUserPackageMutation,
  useDeactiveUserPackageMutation,
  useGetAllUsersQuery,
  useUserBlockMutation,
  useUserUnblockMutation,
} from "@/redux/features/auth/authApi";
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
import SearchBtn from "@/components/client/SearchBtn";
import { Separator } from "@/components/ui/separator";
import { handleUserAction } from "@/components/dashboard/admin/User/UserAction";
import SubscriberModal from "@/components/dashboard/admin/Plan/SubscriberModal";
import { TUser } from "@/types/user.type";
import { toast } from "sonner";
import { ActionButton } from "@/components/dashboard/admin/User/ActionButton";
const SubscribePage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const limit = 10;
  const [userBlock] = useUserBlockMutation();
  const [userUnblock] = useUserUnblockMutation();
  const [activeUserPackage, { isLoading: isActiveLoading }] =
    useActiveUserPackageMutation();
  const [deactiveUserPackage, { isLoading: isDeactiveLoading }] =
    useDeactiveUserPackageMutation();

  const handleButtonClick = (user: TUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const { data, isLoading } = useGetAllUsersQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  const [searchText, setSearchText] = useState("");
  const filteredUser = data?.data?.filter(
    (user: TUser) =>
      user?.isBuyPackage === true &&
      ((user?.fullname &&
        user?.fullname.toLowerCase().includes(searchText.toLowerCase())) ||
        (user?.email &&
          user?.email.toLowerCase().includes(searchText.toLowerCase())) ||
        (user?.packageType &&
          user?.packageType.toLowerCase().includes(searchText.toLowerCase())))
  );


  useEffect(() => {
    dispatch(setLoading(isLoading)); 
  }, [isLoading, dispatch]);

  const handleUserPackageAction = async (
    id: string,
    action: "activate" | "deactivate"
  ) => {
    try {
      if (action === "activate") {
        await activeUserPackage(id).unwrap();
        toast.success("The user's account has been activated successfully!");
      } else if (action === "deactivate") {
        await deactiveUserPackage(id).unwrap();
        toast.success("The user's account has been deactivated successfully!");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        `Failed to ${
          action === "activate" ? "activate" : "deactivate"
        } the user package.`;
      toast.error(errorMessage);
    }
  };

  const renderTableRows = () => {
    return filteredUser?.map((user) => (
      <TableRow key={user?._id}>
        <TableCell>{user?.fullname}</TableCell>
        <TableCell>{user?.email}</TableCell>
        <TableCell>{user?.packageType}</TableCell>
        <TableCell>
          {user?.packageExpiry
            ? moment(user.packageExpiry).format("MMMM Do YYYY, h:mm:ss a")
            : "N/A"}
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          {user.isBlocked ? (
            <Button
              onClick={() =>
                handleUserAction(
                  userUnblock,
                  user._id as string,
                  "User unblocked successfully"
                )
              }
              size="sm"
              className="bg-red-500 hover:bg-red-600"
            >
              Unblock
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleUserAction(
                  userBlock,
                  user._id as string,
                  "User blocked successfully"
                )
              }
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              Block
            </Button>
          )}
          {user?.isPremium ? (
            <ActionButton
              onClick={() =>
                handleUserPackageAction(user?._id as string, "deactivate")
              }
              isLoading={isDeactiveLoading}
              loadingText="Deactivating..."
              defaultText="Deactivate"
              className="mr-2 bg-red-700 hover:bg-red-600"
            />
          ) : (
            <ActionButton
              onClick={() =>
                handleUserPackageAction(user?._id as string, "activate")
              }
              isLoading={isActiveLoading}
              loadingText="Activating..."
              defaultText="Activate"
              className="mr-2"
            />
          )}

          <Button
            onClick={() => handleButtonClick(user)}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600"
          >
            View Details
          </Button>
          <SubscriberModal
            openDialog={isDialogOpen}
            onClose={handleCloseDialog}
            user={selectedUser as TUser}
          />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">All Subscriber</h1>
        <SearchBtn setSearchText={setSearchText} inputBelow={false} />
      </div>
      <Separator className="mt-5" />
      <div>
        {data?.data?.length === 0 || filteredUser?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className="text-gray-400" />
            <h1 className="text-gray-400">No User Found!</h1>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Package Type</TableHead>
                  <TableHead>Package Expiry</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            {filteredUser?.length === limit && (
              <div className="my-5 flex items-end justify-end">
                <PaginationCard
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribePage;
