import { UploadButton } from "@/lib/uploadthing";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  isLoading: boolean;
};

export function FileUploader({ onFieldChange, isLoading }: FileUploaderProps) {
  return (
    <UploadButton
      disabled={isLoading}
      appearance={{
        button:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent !text-primary h-10 px-4 py-2",
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res: any) => {
        const urls = res.map((obj: any) => obj.url);

        onFieldChange(urls[0]);
      }}
      onUploadError={(error: Error) => {
        throw new Error(`something went wrong, try again later: ${error}`);
      }}
    />
  );
}
