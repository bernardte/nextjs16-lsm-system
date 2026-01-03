import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

export const RenderState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className="text-center">
      <div className="bg-muted-foreground/10 mx-auto flex size-12 items-center justify-center rounded-full">
        <CloudUploadIcon
          className={cn(
            "text-muted-foreground size-6",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-foreground text-base font-semibold">
        Drop your file here
        <span className="text-primary font-bold"> click to upload</span>
      </p>
      <Button className="mt-4" type="button">
        Select File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="bg-destructive/30 mx-auto flex size-12 items-center justify-center rounded-full">
        <ImageIcon className="text-destructive size-6" />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
    <Button type="button" className="mt-4">Retry File Selection</Button>
    </div>
  );
};
