/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const handleUserAction = async (
  action: (id: string) => any,
  id: string,
  successMessage: string
) => {
  const toastId = toast.loading(`${successMessage}...`);

  try {
    // Trigger the mutation
    const response = await action(id).unwrap(); // unwrap to access the response directly

    // Check for errors and success
    if (response.error) {
      toast.error(response.error.data.message, {
        id: toastId,
        duration: 1500,
      });
    } else {
      toast.success(successMessage, {
        id: toastId,
        duration: 1000,
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
  }
};
