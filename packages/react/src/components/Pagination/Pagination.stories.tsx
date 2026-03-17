/**
 * Pagination Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Data Display/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Interactive wrapper
const InteractivePagination = (
  props: Partial<React.ComponentProps<typeof Pagination>>,
) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <InteractivePagination />,
};

export const FewPages: Story = {
  render: () => <InteractivePagination totalPages={5} />,
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <Pagination currentPage={page} totalPages={100} onPageChange={setPage} />
    );
  },
};

export const SmallSize: Story = {
  render: () => <InteractivePagination size="sm" />,
};

export const LargeSize: Story = {
  render: () => <InteractivePagination size="lg" />,
};

export const NoFirstLast: Story = {
  render: () => <InteractivePagination showFirstLast={false} />,
};

export const NoPrevNext: Story = {
  render: () => <InteractivePagination showPrevNext={false} />,
};

export const OnlyPageNumbers: Story = {
  render: () => (
    <InteractivePagination showFirstLast={false} showPrevNext={false} />
  ),
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
    disabled: true,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
};

export const WithMoreSiblings: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <Pagination
        currentPage={page}
        totalPages={50}
        onPageChange={setPage}
        siblingCount={2}
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Small
        </p>
        <InteractivePagination size="sm" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Medium (Default)
        </p>
        <InteractivePagination size="md" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Large
        </p>
        <InteractivePagination size="lg" />
      </div>
    </div>
  ),
};

export const WithDataTable: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = 47;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "var(--spacing-6)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--text-secondary)",
            }}
          >
            Showing items {startItem}-{endItem} of {totalItems}
          </p>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    );
  },
};
