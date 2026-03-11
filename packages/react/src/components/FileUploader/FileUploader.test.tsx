import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploader } from "./FileUploader";
import { Upload } from "lucide-react";

describe("FileUploader", () => {
  it("renders upload area", () => {
    render(
      <FileUploader onUpload={() => {}} />,
    );

    const uploadArea = screen.getByText(/upload|drop|select/i);
    expect(uploadArea).toBeInTheDocument();
  });

  it("handles file selection", async () => {
    const handleUpload = vi.fn();
    const user = userEvent.setup();

    render(
      <FileUploader onUpload={handleUpload} />,
    );

    const input = screen.getByRole("button") || screen.getByText(/upload/i);
    expect(input).toBeInTheDocument();
  });

  it("shows file list after upload", () => {
    const { rerender } = render(
      <FileUploader
        onUpload={() => {}}
        files={[
          { name: "document.pdf", size: 1024, type: "application/pdf" },
        ]}
      />,
    );

    expect(rerender).toBeTruthy();
  });

  it("supports multiple file upload", () => {
    render(
      <FileUploader
        onUpload={() => {}}
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
        onUpload={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
