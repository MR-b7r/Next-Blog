import { UploadButton } from "@/lib/uploadthing";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
};

export function FileUploader({ onFieldChange }: FileUploaderProps) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res: any) => {
        const urls = res.map((obj: any) => obj.url);

        onFieldChange(urls[0]);
      }}
      onUploadError={(error: Error) => {
        throw new Error(`something w
          ent wrong, try again later: ${error}`);
      }}
    />
  );
}
