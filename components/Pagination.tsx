import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

const Pagination = ({
  totalPages,
  pageNumber,
}: {
  totalPages: number;
  pageNumber: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (type: "prev" | "next") => {
    const newPageNumber = type === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: newPageNumber.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="table-actions">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleNavigation("prev")}
        disabled={Number(pageNumber) <= 1}
        className="shad-gray-btn"
      >
        <ArrowLongLeftIcon
          width={24}
          height={24}
          className="mr-2 text-blue-600"
        />
        Prev
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleNavigation("next")}
        disabled={Number(pageNumber) >= totalPages}
        className="shad-gray-btn"
      >
        Next
        <ArrowLongRightIcon
          width={24}
          height={24}
          className="ml-2 text-blue-600"
        />
      </Button>
    </div>
  );
};

export default Pagination;
