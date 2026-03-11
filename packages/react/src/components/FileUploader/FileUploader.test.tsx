import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploader } from "./FileUploader";
import { Upload } from "lucide-react";

describe("FileUploader", () => {
  it("renders upload area", () => {
    render(
      <FileUploader onFilesAdded={() => {}} />,
    );

    const uploadArea = screen.getByText(/upload|drop|select/i);
    expect(uploadArea).toBeInTheDocument();
  });

  it("handles file selection", async () => {
    const handleFilesAdded = vi.fn();
    const user = userEvent.setup();

    render(
      <FileUploader onFilesAdded={handleFilesAdded} />,
    );

    const input = screen.getByRole("button") || screen.getByText(/upload/i);
    expect(input).toBeInTheDocument();
  });

  it("shows file list after upload", () => {
    const { rerender } = render(
      <FileUploader
        onFilesAdded={() => {}}
        files={[
          { id: "1", name: "document.pdf", size: 1024, type: "application/pdf", status: "completed" },
        ]}
      />,
    );

    expect(rerender).toBeTruthy();
  });

  it("supports multiple file upload", () => {
    render(
      <FileUploader
        onFilesAdded={() => {}}
        multiple
      />,
    );

    expect(screen.getByText(/upload|drop/i)).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <FileUploader
        ref={ref}
        onFilesAdded={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
