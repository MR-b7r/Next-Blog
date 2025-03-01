// "use client";

import DashProfile from "@/components/DashProfile";
import DashSidebar from "@/components/DashSidebar";
import React from "react";
// import StoreProvider from "../../StoreProvider";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "@/lib/store";
import DashPosts from "@/components/DashPosts";
import { auth } from "@/lib/auth";
import { userSignIn } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: SearchParamProps) => {
  const page = searchParams.tab || "profile";
  const pageNumber = Number(searchParams.page || 1);

  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);

  return (
    // <StoreProvider>
    // <PersistGate persistor={persistor} loading={null}>
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900">
      <div className="md:w-56">
        <DashSidebar currentUser={currentUser} />
      </div>
      {page === "profile" && <DashProfile currentUser={currentUser} />}
      {page === "posts" && <DashPosts pageNumber={pageNumber} />}
    </div>
    // </PersistGate>
    // </StoreProvider>
  );
};

export default page;
