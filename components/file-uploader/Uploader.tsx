"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { type FileRejection } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderState, RenderErrorState } from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { resolve } from "path";
import { rejects } from "assert";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

const Uploader = () => {

  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    isDeleting: false,
    progress: 0,
    uploading: false,
  });

  const uploadFile = async (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }))

    try {
      // 1. Get presigned URL

      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        })
      });

      if(!presignedResponse.ok){
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          
        }
      })
    } catch (error) {
      
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        fileType: "image",
        isDeleting: false
      })
    }
  }, []);

  //? file validation
  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const invalidFileType = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-invalid-type"
      );

      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if(invalidFileType){
        toast.error("Only accept JPG, JPEG, PNG file!");
      }

      if (fileSizeToBig) {
        toast.error("File size exceed the limit of 5mb!");
      }

      if (tooManyFiles) {
        toast.error(
          "Too many files selected, maximum file accepted is 1 file!"
        );
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb
    onDropRejected: rejectedFiles
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex h-full w-full cursor-pointer items-center justify-center">
        <input {...getInputProps()} />
        {/* <RenderErrorState /> */}
        <RenderState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};

export default Uploader;
