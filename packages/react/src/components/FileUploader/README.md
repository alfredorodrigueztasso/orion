# FileUploader Section

> Drag and drop file upload zone with progress tracking and file list.

## Quick Start

```tsx
import { FileUploader } from "@orion/react";

<FileUploader
  accept={["image/*", ".pdf", ".doc", ".docx"]}
  maxFiles={5}
  maxSize={10 * 1024 * 1024} // 10MB
  onFilesAdded={(files) => handleUpload(files)}
/>;
```

---

## Features

- **Drag & Drop** — Drop files directly onto the zone
- **Click to Browse** — Click to open file picker
- **File Validation** — Type, size, and count limits
- **Progress Tracking** — Upload progress per file
- **File List** — Display uploaded/uploading files
- **Image Previews** — Thumbnail previews for images
- **Multiple Variants** — Default, Minimal, Card styles
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface FileUploaderProps {
  // Validation
  accept?: string[]; // Accepted file types
  maxFiles?: number; // Maximum files allowed
  maxSize?: number; // Max file size in bytes
  multiple?: boolean; // Allow multiple - default: true

  // Callbacks
  onFilesAdded?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;

  // Controlled
  files?: UploadedFile[]; // Current uploaded files

  // Display
  placeholder?: string; // Dropzone text
  dropzoneContent?: ReactNode; // Custom dropzone content
  showFileList?: boolean; // Show file list - default: true
  helperText?: string; // Help text below dropzone

  // Styling
  variant?: "default" | "minimal" | "card"; // default: 'default'
  compact?: boolean; // Compact mode - default: false

  // State
  disabled?: boolean; // Disabled state
  error?: string; // Error message
}

interface UploadedFile {
  id: string; // Unique identifier
  name: string; // File name
  size: number; // Size in bytes
  type: string; // MIME type
  progress?: number; // Upload progress 0-100
  status: "pending" | "uploading" | "completed" | "error";
  error?: string; // Error message
  preview?: string; // Preview URL (images)
  file?: File; // Original File object
}
```

---

## File Type Restrictions

### Accept Specific Types

```tsx
// Images only
<FileUploader accept={['image/*']} />

// Specific image types
<FileUploader accept={['image/png', 'image/jpeg', 'image/gif']} />

// Documents
<FileUploader accept={['.pdf', '.doc', '.docx', '.txt']} />

// Spreadsheets
<FileUploader accept={['.xlsx', '.xls', '.csv']} />

// Mixed
<FileUploader accept={['image/*', '.pdf', '.doc', '.docx']} />
```

---

## Size Limits

```tsx
// 5MB limit
<FileUploader maxSize={5 * 1024 * 1024} />

// 50MB limit
<FileUploader maxSize={50 * 1024 * 1024} />

// Helper text showing limit
<FileUploader
  maxSize={10 * 1024 * 1024}
  helperText="Maximum file size: 10MB"
/>
```

---

## File Count Limits

```tsx
// Single file only
<FileUploader multiple={false} />

// Maximum 3 files
<FileUploader maxFiles={3} />

// Unlimited files
<FileUploader />  // maxFiles defaults to unlimited
```

---

## Visual Variants

### `variant="default"` (Default)

Standard dropzone with dashed border.

```tsx
<FileUploader variant="default" onFilesAdded={handleFiles} />
```

### `variant="minimal"`

Simplified appearance for inline use.

```tsx
<FileUploader variant="minimal" onFilesAdded={handleFiles} />
```

### `variant="card"`

Card-style with elevated appearance.

```tsx
<FileUploader variant="card" onFilesAdded={handleFiles} />
```

---

## Custom Dropzone Content

```tsx
<FileUploader
  dropzoneContent={
    <div style={{ textAlign: "center" }}>
      <Upload size={32} />
      <p>Drop your files here</p>
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
        or click to browse
      </p>
    </div>
  }
  onFilesAdded={handleFiles}
/>
```

---

## Controlled File List

```tsx
function ControlledUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFilesAdded = async (newFiles: File[]) => {
    // Create file entries
    const fileEntries = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading" as const,
      progress: 0,
      file,
    }));

    setFiles((prev) => [...prev, ...fileEntries]);

    // Upload each file
    for (const entry of fileEntries) {
      try {
        await uploadFile(entry.file, (progress) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === entry.id ? { ...f, progress } : f)),
          );
        });

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, status: "completed", progress: 100 }
              : f,
          ),
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, status: "error", error: "Upload failed" }
              : f,
          ),
        );
      }
    }
  };

  const handleFileRemove = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <FileUploader
      files={files}
      onFilesAdded={handleFilesAdded}
      onFileRemove={handleFileRemove}
      accept={["image/*", ".pdf"]}
      maxSize={10 * 1024 * 1024}
    />
  );
}
```

---

## Error Handling

### Global Error

```tsx
<FileUploader
  error="Upload failed. Please try again."
  onFilesAdded={handleFiles}
/>
```

### Per-File Errors

```tsx
files={[
  {
    id: '1',
    name: 'document.pdf',
    size: 1024,
    type: 'application/pdf',
    status: 'error',
    error: 'File too large'
  }
]}
```

---

## Complete Examples

### Image Upload

```tsx
import { FileUploader } from "@orion/react";

function ImageUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  return (
    <FileUploader
      accept={["image/png", "image/jpeg", "image/gif"]}
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
      files={files}
      onFilesAdded={async (newFiles) => {
        // Add files with previews
        const entries = await Promise.all(
          newFiles.map(async (file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: "pending" as const,
            preview: URL.createObjectURL(file),
            file,
          })),
        );
        setFiles((prev) => [...prev, ...entries]);
      }}
      onFileRemove={(id) => {
        const file = files.find((f) => f.id === id);
        if (file?.preview) URL.revokeObjectURL(file.preview);
        setFiles((prev) => prev.filter((f) => f.id !== id));
      }}
      placeholder="Drag images here, or click to browse"
      helperText="PNG, JPG, or GIF up to 5MB each"
    />
  );
}
```

### Document Upload with Progress

```tsx
import { FileUploader, Button } from "@orion/react";

function DocumentUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFilesAdded = (newFiles: File[]) => {
    const entries = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending" as const,
      progress: 0,
      file,
    }));
    setFiles((prev) => [...prev, ...entries]);
  };

  const uploadAll = async () => {
    setUploading(true);
    const pending = files.filter((f) => f.status === "pending");

    for (const file of pending) {
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "uploading" } : f)),
      );

      // Simulate upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((r) => setTimeout(r, 100));
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
        );
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "completed", progress: 100 } : f,
        ),
      );
    }

    setUploading(false);
  };

  return (
    <div>
      <FileUploader
        accept={[".pdf", ".doc", ".docx"]}
        maxSize={25 * 1024 * 1024}
        files={files}
        onFilesAdded={handleFilesAdded}
        onFileRemove={(id) =>
          setFiles((prev) => prev.filter((f) => f.id !== id))
        }
        placeholder="Drop documents here"
        helperText="PDF, DOC, or DOCX up to 25MB"
        disabled={uploading}
      />

      {files.some((f) => f.status === "pending") && (
        <Button
          onClick={uploadAll}
          loading={uploading}
          style={{ marginTop: "var(--spacing-4)" }}
        >
          Upload {files.filter((f) => f.status === "pending").length} Files
        </Button>
      )}
    </div>
  );
}
```

### Compact Avatar Upload

```tsx
<FileUploader
  variant="minimal"
  compact
  multiple={false}
  accept={["image/*"]}
  maxSize={2 * 1024 * 1024}
  showFileList={false}
  placeholder="Click to upload avatar"
  helperText="Square image, max 2MB"
  onFilesAdded={([file]) => updateAvatar(file)}
/>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Field label="Name" name="name" required />
  <Field label="Email" name="email" type="email" required />

  <div style={{ marginTop: "var(--spacing-4)" }}>
    <label>Attachments</label>
    <FileUploader
      accept={[".pdf", ".doc", ".docx", "image/*"]}
      maxFiles={3}
      maxSize={10 * 1024 * 1024}
      onFilesAdded={setAttachments}
      helperText="Up to 3 files, 10MB each"
    />
  </div>

  <Button type="submit">Submit</Button>
</form>
```

---

## Accessibility

- Dropzone is keyboard accessible
- File input has proper label
- Upload progress announced to screen readers
- Error messages associated with files
- Remove buttons have accessible labels

```tsx
// Good: Clear helper text
<FileUploader
  helperText="Supported formats: PNG, JPG, PDF. Max size: 10MB."
/>

// Avoid: No context about restrictions
<FileUploader />
```

---

## Anti-Patterns

### No File Type Feedback

```tsx
// WRONG - User doesn't know what's accepted
<FileUploader onFilesAdded={handleFiles} />

// CORRECT - Clear guidance
<FileUploader
  accept={['image/*', '.pdf']}
  helperText="Images or PDF files only"
  onFilesAdded={handleFiles}
/>
```

### Silent Validation Failures

```tsx
// WRONG - File rejected without feedback
onFilesAdded={(files) => {
  const valid = files.filter(f => f.size < maxSize);
  upload(valid);  // Silently dropped large files
}}

// CORRECT - Show validation errors
onFilesAdded={(files) => {
  const tooBig = files.filter(f => f.size > maxSize);
  if (tooBig.length) {
    setError(`${tooBig.length} files exceed size limit`);
  }
  const valid = files.filter(f => f.size <= maxSize);
  upload(valid);
}}
```

### No Progress Indication

```tsx
// WRONG - User doesn't know upload status
<FileUploader
  files={files}  // All show as 'pending' forever
/>

// CORRECT - Track and display progress
<FileUploader
  files={files.map(f => ({
    ...f,
    status: uploadProgress[f.id] === 100 ? 'completed' : 'uploading',
    progress: uploadProgress[f.id]
  }))}
/>
```

---

## When to Use FileUploader

| Scenario             | Recommendation       |
| -------------------- | -------------------- |
| Document upload      | Default variant      |
| Image gallery upload | With previews        |
| Avatar/profile photo | Compact, single file |
| Form attachment      | Default or minimal   |

## When NOT to Use FileUploader

| Scenario               | Use Instead               |
| ---------------------- | ------------------------- |
| Camera capture         | Camera input component    |
| URL input              | Text input for URLs       |
| Copy/paste content     | Text area                 |
| Large batch processing | Background upload service |

---

## Related Components

- **[Field](../../components/Field/README.md)** — Form fields
- **[Button](../../components/Button/README.md)** — Upload triggers
- **[Progress](../../components/Progress/README.md)** — Progress indicator
- **[EmptyState](../EmptyState/README.md)** — No files state
