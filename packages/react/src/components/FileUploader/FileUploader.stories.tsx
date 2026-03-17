import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { FileUploader } from "./FileUploader";
import type { UploadedFile } from "./FileUploader.types";

const meta: Meta<typeof FileUploader> = {
  title: "Sections/App/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

// Sample uploaded files
const sampleFiles: UploadedFile[] = [
  {
    id: "1",
    name: "document.pdf",
    size: 1024 * 1024 * 2.5, // 2.5 MB
    type: "application/pdf",
    status: "completed",
  },
  {
    id: "2",
    name: "image.png",
    size: 1024 * 512, // 512 KB
    type: "image/png",
    status: "uploading",
    progress: 65,
    preview: "https://picsum.photos/100/100?random=1",
  },
  {
    id: "3",
    name: "spreadsheet.xlsx",
    size: 1024 * 1024 * 1.2,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    status: "completed",
  },
];

/**
 * Default FileUploader
 */
export const Default: Story = {
  args: {
    accept: ["image/*", ".pdf", ".doc", ".docx"],
    maxSize: 10 * 1024 * 1024, // 10 MB
    maxFiles: 5,
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Interactive FileUploader with state
 */
export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const handleFilesAdded = useCallback((newFiles: File[]) => {
      const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading" as const,
        progress: 0,
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setFiles((prev) => [...prev, ...uploadedFiles]);

      // Simulate upload progress
      uploadedFiles.forEach((uploadedFile) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, status: "completed" as const, progress: 100 }
                  : f,
              ),
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, progress: Math.min(progress, 99) }
                  : f,
              ),
            );
          }
        }, 500);
      });
    }, []);

    const handleFileRemove = useCallback((fileId: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === fileId);
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        return prev.filter((f) => f.id !== fileId);
      });
    }, []);

    return (
      <FileUploader
        accept={["image/*", ".pdf"]}
        maxSize={5 * 1024 * 1024}
        maxFiles={3}
        files={files}
        onFilesAdded={handleFilesAdded}
        onFileRemove={handleFileRemove}
        helperText="Drag and drop or click to upload. Max 3 files, 5MB each."
      />
    );
  },
};

/**
 * With existing files
 */
export const WithFiles: Story = {
  args: {
    files: sampleFiles,
    onFileRemove: (id: string) => console.log("Remove file:", id),
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Images only
 */
export const ImagesOnly: Story = {
  args: {
    accept: ["image/*"],
    placeholder: "Drag and drop images here, or click to browse",
    maxSize: 5 * 1024 * 1024,
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Single file upload
 */
export const SingleFile: Story = {
  args: {
    multiple: false,
    maxFiles: 1,
    accept: [".pdf"],
    placeholder: "Upload a PDF document",
    onFilesAdded: (files: File[]) => console.log("File added:", files[0]),
  },
};

/**
 * Compact variant
 */
export const Compact: Story = {
  args: {
    compact: true,
    accept: ["image/*", ".pdf"],
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Minimal variant
 */
export const Minimal: Story = {
  args: {
    variant: "minimal",
    accept: ["image/*", ".pdf"],
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Card variant
 */
export const Card: Story = {
  args: {
    variant: "card",
    accept: ["image/*", ".pdf", ".doc", ".docx"],
    maxSize: 10 * 1024 * 1024,
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * With error
 */
export const WithError: Story = {
  args: {
    accept: ["image/*"],
    error: "File type not supported. Please upload an image.",
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "File upload is disabled",
  },
};

/**
 * Without file list
 */
export const WithoutFileList: Story = {
  args: {
    showFileList: false,
    files: sampleFiles,
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};

/**
 * File status examples
 */
export const FileStatuses: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "pending-file.pdf",
        size: 1024 * 500,
        type: "application/pdf",
        status: "pending",
      },
      {
        id: "2",
        name: "uploading-file.png",
        size: 1024 * 1024,
        type: "image/png",
        status: "uploading",
        progress: 45,
      },
      {
        id: "3",
        name: "completed-file.docx",
        size: 1024 * 750,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        status: "completed",
      },
      {
        id: "4",
        name: "failed-file.xlsx",
        size: 1024 * 1024 * 5,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        status: "error",
        error: "Upload failed",
      },
    ],
    onFileRemove: (id: string) => console.log("Remove file:", id),
  },
};

/**
 * Large file limit
 */
export const LargeFileLimit: Story = {
  args: {
    maxSize: 100 * 1024 * 1024, // 100 MB
    placeholder: "Upload large files (up to 100MB)",
    helperText: "Supported formats: Any file type",
    onFilesAdded: (files: File[]) => console.log("Files added:", files),
  },
};
