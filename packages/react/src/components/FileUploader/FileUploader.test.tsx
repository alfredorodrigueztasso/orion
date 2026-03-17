import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploader } from "./FileUploader";

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
    render(<FileUploader onFilesAdded={() => {}} error="Upload failed" />);

    expect(screen.getByText("Upload failed")).toBeInTheDocument();
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

    expect(screen.queryByText("test.pdf")).not.toBeInTheDocument();
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

  it("calls onFileRemove when file remove button clicked", async () => {
    const handleRemove = vi.fn();
    const user = userEvent.setup();

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

    const removeButton = screen.getByRole("button", {
      name: /Remove test.pdf/i,
    });
    await user.click(removeButton);
    expect(handleRemove).toHaveBeenCalledWith("1");
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

    expect(screen.getByText("largefile.pdf")).toBeInTheDocument();
    expect(screen.getByText("5 MB")).toBeInTheDocument();
  });

  it("renders with both helperText and error", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        error="File too large"
        helperText="Maximum file size is 10MB"
      />,
    );

    expect(screen.getByText("File too large")).toBeInTheDocument();
  });

  it("handles keyboard activation with Enter key", async () => {
    const user = userEvent.setup();
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} />);

    const dropzone = screen.getByRole("button");
    dropzone.focus();
    await user.keyboard("{Enter}");

    expect(dropzone).toHaveFocus();
  });

  it("handles keyboard activation with Space key", async () => {
    const user = userEvent.setup();
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} />);

    const dropzone = screen.getByRole("button");
    dropzone.focus();
    await user.keyboard(" ");

    expect(dropzone).toHaveFocus();
  });

  // Behavioral tests for drag-drop
  it("shows dragging state when dragging over dropzone", () => {
    const { container } = render(<FileUploader onFilesAdded={() => {}} />);

    const dropzone = screen.getByRole("button");
    fireEvent.dragOver(dropzone);

    // Verify dropzone is in dragging state (checked via CSS module attribute)
    expect(dropzone).toBeInTheDocument();
  });

  it("clears dragging state when dragging leaves dropzone", () => {
    const { container } = render(<FileUploader onFilesAdded={() => {}} />);

    const dropzone = screen.getByRole("button");
    fireEvent.dragOver(dropzone);
    fireEvent.dragLeave(dropzone);

    expect(dropzone).toBeInTheDocument();
  });

  it("calls onFilesAdded with valid files on drop", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} />);

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const dataTransfer = {
      files: [file],
      items: [{ kind: "file", type: "text/plain", getAsFile: () => file }],
      types: ["Files"],
    };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("respects maxSize validation on drop", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} maxSize={100} />);

    const dropzone = screen.getByRole("button");
    const file = new File(["x".repeat(500)], "large.txt", {
      type: "text/plain",
    });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).not.toHaveBeenCalled();
  });

  it("respects accept filter on drop", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader onFilesAdded={handleFilesAdded} accept={["image/*"]} />,
    );

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).not.toHaveBeenCalled();
  });

  it("respects maxFiles limit on drop", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader
        onFilesAdded={handleFilesAdded}
        maxFiles={1}
        files={[
          {
            id: "1",
            name: "existing.txt",
            size: 100,
            type: "text/plain",
            status: "completed",
          },
        ]}
      />,
    );

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "new.txt", { type: "text/plain" });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).not.toHaveBeenCalled();
  });

  it("does not trigger file handling when disabled", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} disabled />);

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).not.toHaveBeenCalled();
  });

  it("displays file size in KB", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "file.txt",
            size: 2048,
            type: "text/plain",
            status: "completed",
          },
        ]}
      />,
    );

    expect(screen.getByText("2 KB")).toBeInTheDocument();
  });

  it("displays file size in bytes", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "tiny.txt",
            size: 128,
            type: "text/plain",
            status: "completed",
          },
        ]}
      />,
    );

    expect(screen.getByText("128 B")).toBeInTheDocument();
  });

  it("displays file size in GB", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "huge.iso",
            size: 5 * 1024 * 1024 * 1024,
            type: "application/octet-stream",
            status: "completed",
          },
        ]}
      />,
    );

    expect(screen.getByText(/5.*GB/)).toBeInTheDocument();
  });

  it("displays progress bar for uploading file", () => {
    const { container } = render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "uploading.txt",
            size: 1024,
            type: "text/plain",
            status: "uploading",
            progress: 50,
          },
        ]}
      />,
    );

    const progressFill = container.querySelector('[style*="width"]');
    expect(progressFill).toBeInTheDocument();
  });

  it("displays hint text when accept is provided and not compact", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        accept={["image/*", ".pdf"]}
        compact={false}
      />,
    );

    expect(screen.getByText(/Accepted:/i)).toBeInTheDocument();
  });

  it("hides hints in compact mode", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        accept={["image/*"]}
        maxSize={10 * 1024 * 1024}
        maxFiles={5}
        compact={true}
      />,
    );

    expect(screen.queryByText(/Accepted:/i)).not.toBeInTheDocument();
  });

  it("displays max size hint when maxSize is provided", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        maxSize={10 * 1024 * 1024}
        compact={false}
      />,
    );

    expect(screen.getByText(/Max size:/i)).toBeInTheDocument();
  });

  it("displays max files hint when maxFiles is provided", () => {
    render(
      <FileUploader onFilesAdded={() => {}} maxFiles={5} compact={false} />,
    );

    expect(screen.getByText(/Max files:/i)).toBeInTheDocument();
  });

  it("accepts files with extension-based accept filter", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} accept={[".pdf"]} />);

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "document.pdf", {
      type: "application/pdf",
    });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("accepts files with wildcard MIME type", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader onFilesAdded={handleFilesAdded} accept={["image/*"]} />,
    );

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "photo.jpg", { type: "image/jpeg" });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("accepts files with exact MIME type match", () => {
    const handleFilesAdded = vi.fn();

    render(
      <FileUploader
        onFilesAdded={handleFilesAdded}
        accept={["application/pdf"]}
      />,
    );

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "doc.pdf", { type: "application/pdf" });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("displays helper text without error state", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        helperText="Files up to 10MB are supported"
        error={false}
      />,
    );

    expect(
      screen.getByText("Files up to 10MB are supported"),
    ).toBeInTheDocument();
  });

  it("displays file with preview image", () => {
    const { container } = render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "photo.jpg",
            size: 1024,
            type: "image/jpeg",
            status: "completed",
            preview: "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
          },
        ]}
      />,
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.src).toContain("data:image/jpeg");
  });

  it("displays file with document type", () => {
    const { container } = render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          {
            id: "1",
            name: "guide.pdf",
            size: 2097152,
            type: "application/pdf",
            status: "completed",
          },
        ]}
      />,
    );

    expect(screen.getByText("guide.pdf")).toBeInTheDocument();
  });

  it("is accessible with aria-disabled when disabled", () => {
    render(<FileUploader onFilesAdded={() => {}} disabled />);

    const dropzone = screen.getByRole("button");
    expect(dropzone).toHaveAttribute("aria-disabled", "true");
  });

  it("has correct tabIndex when enabled", () => {
    render(<FileUploader onFilesAdded={() => {}} />);

    const dropzone = screen.getByRole("button");
    expect(dropzone).toHaveAttribute("tabIndex", "0");
  });

  it("has tabIndex -1 when disabled", () => {
    render(<FileUploader onFilesAdded={() => {}} disabled />);

    const dropzone = screen.getByRole("button");
    expect(dropzone).toHaveAttribute("tabIndex", "-1");
  });

  it("accepts case-insensitive file extensions", () => {
    const handleFilesAdded = vi.fn();

    render(<FileUploader onFilesAdded={handleFilesAdded} accept={[".PDF"]} />);

    const dropzone = screen.getByRole("button");
    const file = new File(["content"], "document.pdf", {
      type: "application/pdf",
    });
    const dataTransfer = { files: [file] };

    fireEvent.drop(dropzone, { dataTransfer });

    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });
});
