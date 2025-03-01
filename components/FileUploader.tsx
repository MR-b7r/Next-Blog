// import { Dispatch, SetStateAction } from "react";
// import { useAppSelector } from "@/lib/hooks";

import { UploadButton } from "@/lib/uploadthing";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  type?: string;
  imageUrl?: string;
};

export function FileUploader({
  onFieldChange,
  type,
  imageUrl,
}: FileUploaderProps) {
  // const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      {type !== "post" && (
        <div className="flex flex-col items-center gap-3 w-full justify-center my-5">
          <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              // src={currentUser?.profilePicture}
              width={77}
              height={77}
              className="rounded-full w-full h-full object-cover border-2 border-[lightgray]"
            />
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              const urls = res.map((obj: any) => obj.url);

              onFieldChange(urls[0]);
            }}
            onUploadError={(error: Error) => {
              throw new Error(
                `something went wrong, try again later: ${error}`
              );
            }}
          />
        </div>
      )}

      {type === "post" && (
        <div className="flex flex-col items-center justify-center gap-3 mx-auto ">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              const urls = res.map((obj: any) => obj.url);

              onFieldChange(urls[0]);
            }}
            onUploadError={(error: Error) => {
              throw new Error(
                `something went wrong, try again later: ${error}`
              );
            }}
          />
          <img src={imageUrl} className="max-w-full max-h-72 object-cover" />
        </div>
      )}
    </>
  );
}
