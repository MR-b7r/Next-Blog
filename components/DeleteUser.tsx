import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import {
//   deleteUserEnd,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
// } from "@/lib/features/user/userSlice";
import { deleteUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import closeButton from "@/public/close.svg";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SignoutUser from "./SignoutUser";

const DeleteUser = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  // const dispatch = useAppDispatch();
  // const {
  //   loading,
  //   error: errorMessage,
  //   currentUser,
  // } = useAppSelector((state) => state.user);

  const handleDeleteUser = async () => {
    try {
      // dispatch(deleteUserStart());
      await deleteUser(currentUser);
      // dispatch(deleteUserSuccess());
      toast.success("Account has been deleted");
    } catch (error) {
      // dispatch(deleteUserFailure(error));
      toast.error("Cannot delete the account");
    } finally {
      // dispatch(deleteUserEnd());
    }
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="text-red-500 flex justify-between mt-5">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-100 dark:bg-gray-800 border-gray-900 space-y-5 outline-none ">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between text-base mb-5 text-gray-700 dark:text-gray-200">
              Are you sure you want to delete your account?
              <Image
                src={closeButton}
                alt="close"
                width={20}
                height={20}
                onClick={() => closeModal()}
                className="cursor-pointer bg-gray-800 rounded-full"
              />
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center gap-4">
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700 duration-200 dark:text-white"
              // disabled={loading}
            >
              {false ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SignoutUser />
    </div>
  );
};

export default DeleteUser;
