import { userSignOut } from "@/lib/actions/user.actions";
// import { signOutSuccess } from "@/lib/features/user/userSlice";
// import { useAppDispatch } from "@/lib/hooks";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

const SignoutUser = ({ icon, style }: { icon?: boolean; style?: string }) => {
  // const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await userSignOut();
      // dispatch(signOutSuccess());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {icon ? (
        <div className="flex items-center gap-1 w-full">
          {/* onClick={handleSignOut} */}
          <ArrowLeftEndOnRectangleIcon width={20} />
          <span className={style}>Sign out</span>
        </div>
      ) : (
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      )}
    </>
  );
};

export default SignoutUser;
