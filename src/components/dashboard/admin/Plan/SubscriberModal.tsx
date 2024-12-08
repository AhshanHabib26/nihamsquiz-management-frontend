import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { TUser } from "@/types/user.type";
import { X } from "lucide-react";

interface SubscriberModalProps {
  openDialog: boolean;
  onClose: () => void;
  user: TUser;
}

const SubscriberModal = ({
  openDialog,
  onClose,
  user,
}: SubscriberModalProps) => {
  if (!user) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={(open) => open && handleClose()}>
        <DialogContent className=" max-w-sm lg:max-w-lg mx-auto rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              Subscriber Details
            </h2>
            <DialogClose>
              <X
                size={20}
                className=" absolute top-3 right-3 text-red-500 hover:text-red-600"
                onClick={onClose}
              />
            </DialogClose>
          </div>
          <DialogHeader>
            <DialogDescription>
              <div>
                {user?.paymentDetails &&
                  Array.isArray(user.paymentDetails) &&
                  user.paymentDetails.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm font-light text-gray-800">
                        <h1>Payable Amount</h1>
                        <p>{item?.payableAmount}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm font-light text-gray-800">
                        <h1>Payment Method</h1>
                        <p>{item?.paymentMethod}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm font-light text-gray-800">
                        <h1>Package Type</h1>
                        <p>{item?.packageType}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm font-light text-gray-800">
                        <h1>Phone Number</h1>
                        <p>{item?.phoneNumber}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm font-light text-gray-800">
                        <h1>Package Status</h1>
                        <p>
                          {user?.isPremium ? (
                            <span className="text-green-600">True</span>
                          ) : (
                            <span className="text-red-600">False</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriberModal;
