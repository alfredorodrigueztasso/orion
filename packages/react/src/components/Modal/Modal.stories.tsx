import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { Field } from "../Field/Field";
import { Textarea } from "../Textarea/Textarea";

const meta: Meta<typeof Modal> = {
  title: "Components/Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "var(--spacing-8)" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size",
    },
    closeOnBackdrop: {
      control: "boolean",
      description: "Close modal when clicking backdrop",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Close modal when pressing Escape key",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button in corner",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    children: (
      <>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>This is the modal content. You can put any content here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const SmallSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    size: "sm",
    children: (
      <>
        <Modal.Header>Small Modal</Modal.Header>
        <Modal.Body>
          <p>This is a small modal for quick confirmations.</p>
        </Modal.Body>
      </>
    ),
  },
};

export const LargeSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    size: "lg",
    children: (
      <>
        <Modal.Header>Large Modal</Modal.Header>
        <Modal.Body>
          <p>This is a large modal with more space for content.</p>
          <p>It can contain multiple paragraphs and complex layouts.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Action</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const FullScreen: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    size: "full",
    children: (
      <>
        <Modal.Header>Full Screen Modal</Modal.Header>
        <Modal.Body>
          <p>This modal takes up the entire screen.</p>
          <p>Useful for complex forms or detailed content.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Save</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    showCloseButton: false,
    children: (
      <>
        <Modal.Header>No Close Button</Modal.Header>
        <Modal.Body>
          <p>This modal doesn't have a close button in the corner.</p>
          <p>
            You can only close it using the buttons below or pressing Escape.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Close</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const NoBackdropClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    closeOnBackdrop: false,
    children: (
      <>
        <Modal.Header>Persistent Modal</Modal.Header>
        <Modal.Body>
          <p>Clicking outside this modal won't close it.</p>
          <p>You must use the close button or press Escape.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const ConfirmationDialog: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    size: "sm",
    children: (
      <>
        <Modal.Header>Confirm Action</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const FormModal: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    onClose: () => {},
    size: "md",
    children: (
      <>
        <Modal.Header>Create New Item</Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-4)",
            }}
          >
            <Field
              label="Name"
              type="text"
              placeholder="Enter name"
              fullWidth
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              rows={4}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const AllSizes: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    return (
      <div
        style={{ display: "flex", gap: "var(--spacing-4)", flexWrap: "wrap" }}
      >
        <Button onClick={() => setOpenModal("sm")}>Small</Button>
        <Button onClick={() => setOpenModal("md")}>Medium</Button>
        <Button onClick={() => setOpenModal("lg")}>Large</Button>
        <Button onClick={() => setOpenModal("xl")}>Extra Large</Button>
        <Button onClick={() => setOpenModal("full")}>Full Screen</Button>

        <Modal
          open={openModal === "sm"}
          onClose={() => setOpenModal(null)}
          size="sm"
        >
          <Modal.Header>Small Modal</Modal.Header>
          <Modal.Body>Small size modal content</Modal.Body>
        </Modal>

        <Modal
          open={openModal === "md"}
          onClose={() => setOpenModal(null)}
          size="md"
        >
          <Modal.Header>Medium Modal</Modal.Header>
          <Modal.Body>Medium size modal content</Modal.Body>
        </Modal>

        <Modal
          open={openModal === "lg"}
          onClose={() => setOpenModal(null)}
          size="lg"
        >
          <Modal.Header>Large Modal</Modal.Header>
          <Modal.Body>Large size modal content</Modal.Body>
        </Modal>

        <Modal
          open={openModal === "xl"}
          onClose={() => setOpenModal(null)}
          size="xl"
        >
          <Modal.Header>Extra Large Modal</Modal.Header>
          <Modal.Body>Extra large size modal content</Modal.Body>
        </Modal>

        <Modal
          open={openModal === "full"}
          onClose={() => setOpenModal(null)}
          size="full"
        >
          <Modal.Header>Full Screen Modal</Modal.Header>
          <Modal.Body>Full screen modal content</Modal.Body>
        </Modal>
      </div>
    );
  },
};
