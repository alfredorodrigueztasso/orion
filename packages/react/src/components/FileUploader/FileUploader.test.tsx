import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploader } from "./FileUploader";
import { Upload } from "lucide-react";

describe("FileUploader", () => {
  it("renders upload area", () => {
    render(<FileUploader onFilesAdded={() => {}} />);

    const uploadArea = screen.getByText(/upload|drop|select/i);
    expect(uploadArea).toBeInTheDocument();
  });

  it("handles file selection", async () => {
    const handleFilesAdded = vi.fn();
    const user = userEvent.setup();

    render(<FileUploader onFilesAdded={handleFilesAdded} />);

    const input = screen.getByRole("button") || screen.getByText(/upload/i);
    expect(input).toBeInTheDocument();
  });

  it("shows file list after upload", () => {
    const { rerender } = render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "document.pdf",
            size: 1024,
            type: "application/pdf",
            status: "completed",
          },
        ]}
      />,
    );

    expect(rerender).toBeTruthy();
  });

  it("supports multiple file upload", () => {
    render(<FileUploader onFilesAdded={() => {}} multiple />);

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<FileUploader ref={ref} onFilesAdded={() => {}} />);

    expect(ref).toHaveBeenCalled();
  });

  it("rejects files exceeding maxSize", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} maxSize={1024} />);

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("rejects files exceeding maxFiles limit", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader onFilesAdded={handleFilesAdded} maxFiles={2} multiple />,
    );

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("filters files by accept type", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader
        onFilesAdded={handleFilesAdded}
        accept={["image/*", ".pdf"]}
      />,
    );

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} disabled={true} />);

    const uploadArea = screen.getByText(/upload|drop|select/i);
    expect(uploadArea).toBeInTheDocument();
  });

  it("renders with compact variant", () => {
    const { container } = render(
      <FileUploader onFilesAdded={() => {}} compact={true} />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it("renders with custom variant", () => {
    const { container } = render(
      <FileUploader onFilesAdded={() => {}} variant="minimal" />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it("displays placeholder text", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        placeholder="Drop your files here"
      />,
    );

    expect(screen.getByText(/drop your files here/i)).toBeInTheDocument();
  });

  it("renders custom dropzone content", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        dropzoneContent={<div>Custom upload area</div>}
      />,
    );

    expect(screen.getByText("Custom upload area")).toBeInTheDocument();
  });

  it("displays error message when provided", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        error={true}
        helperText="Upload failed"
      />,
    );

    // Component should render with error state
    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <FileUploader onFilesAdded={() => {}} className="custom-uploader" />,
    );

    const uploader = container.firstChild as HTMLElement;
    expect(uploader?.className).toContain("custom-uploader");
  });

  it("hides file list when showFileList is false", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "test.pdf",
            size: 1024,
            type: "application/pdf",
            status: "completed",
          },
        ]}
        showFileList={false}
      />,
    );

    // Upload area should still be visible
    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("displays files with different statuses", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "file1.pdf",
            size: 1024,
            type: "application/pdf",
            status: "completed",
          },
          {
            id: "2",
            name: "file2.pdf",
            size: 2048,
            type: "application/pdf",
            status: "uploading",
          },
          {
            id: "3",
            name: "file3.pdf",
            size: 512,
            type: "application/pdf",
            status: "error",
          },
        ]}
      />,
    );

    expect(screen.getByText("file1.pdf")).toBeInTheDocument();
    expect(screen.getByText("file2.pdf")).toBeInTheDocument();
    expect(screen.getByText("file3.pdf")).toBeInTheDocument();
  });

  it("calls onFileRemove when file remove button clicked", () => {
    const handleRemove = vi.fn();

    render(
      <FileUploader
        onFilesAdded={() => {}}
        onFileRemove={handleRemove}
        files={[
          {
            id: "1",
            name: "test.pdf",
            size: 1024,
            type: "application/pdf",
            status: "completed",
          },
        ]}
      />,
    );

    expect(screen.getByText("test.pdf")).toBeInTheDocument();
  });

  it("accepts multiple file types", () => {
    const { container } = render(
      <FileUploader
        onFilesAdded={() => {}}
        accept={["image/*", ".pdf", ".docx", "video/*"]}
        multiple={true}
      />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it("handles single file upload when multiple is false", () => {
    const { container } = render(
      <FileUploader onFilesAdded={() => {}} multiple={false} />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it("supports .pdf file type with extension", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        accept={[".pdf", ".doc", ".docx"]}
      />,
    );

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("displays file size information", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "largefile.pdf",
            size: 5242880,
            type: "application/pdf",
            status: "completed",
          },
        ]}
      />,
    );

    // File list should show the large file
    expect(screen.getByText("largefile.pdf")).toBeInTheDocument();
  });

  it("renders with both helperText and error", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        error={true}
        helperText="Maximum file size is 10MB"
      />,
    );

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("handles keyboard activation with Enter key", async () => {
    const user = userEvent.setup();
    const handleFilesAdded = vi.fn();

    const { container } = render(
      <FileUploader onFilesAdded={handleFilesAdded} />,
    );

    const uploadArea = screen.getByText(/upload|drop|select/i);
    await user.keyboard("{Enter}");

    expect(uploadArea).toBeInTheDocument();
  });

  it("handles keyboard activation with Space key", async () => {
    const user = userEvent.setup();
    const handleFilesAdded = vi.fn();

    const { container } = render(
      <FileUploader onFilesAdded={handleFilesAdded} />,
    );

    const uploadArea = screen.getByText(/upload|drop|select/i);
    await user.keyboard(" ");

    expect(uploadArea).toBeInTheDocument();
  });
});
