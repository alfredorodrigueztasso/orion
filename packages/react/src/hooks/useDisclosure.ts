/**
 * useDisclosure Hook
 *
 * Manages open/close state for modals, drawers, dropdowns, etc.
 *
 * @example
 * ```tsx
 * // Orion convention (preferred)
 * const { isOpen, open, close, toggle } = useDisclosure();
 *
 * // MUI/Chakra/Radix convention (also works)
 * const { isOpen, onOpen, onClose, toggle } = useDisclosure();
 *
 * return (
 *   <>
 *     <Button onClick={toggle}>Toggle Modal</Button>
 *     <Modal open={isOpen} onClose={close}>
 *       Content
 *     </Modal>
 *   </>
 * );
 * ```
 */

import { useState, useCallback } from "react";

/**
 * Options for useDisclosure hook
 */
export interface UseDisclosureOptions {
  /**
   * Initial open state
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback when state changes to open
   */
  onOpen?: () => void;

  /**
   * Callback when state changes to closed
   */
  onClose?: () => void;

  /**
   * Callback when state changes (open or close)
   */
  onChange?: (isOpen: boolean) => void;
}

/**
 * Return type for useDisclosure hook
 */
export interface UseDisclosureReturn {
  /**
   * Whether the disclosure is open
   */
  isOpen: boolean;

  /**
   * Open the disclosure
   */
  open: () => void;

  /**
   * Close the disclosure
   */
  close: () => void;

  /**
   * Alias for `open` - familiar for devs from MUI/Chakra/Radix
   */
  onOpen: () => void;

  /**
   * Alias for `close` - familiar for devs from MUI/Chakra/Radix
   */
  onClose: () => void;

  /**
   * Toggle the disclosure
   */
  toggle: () => void;

  /**
   * Set the disclosure state directly
   */
  setIsOpen: (value: boolean) => void;
}

/**
 * Hook for managing open/close state
 *
 * @param options - Configuration options
 * @returns Disclosure state and control functions
 */
export function useDisclosure(
  options: UseDisclosureOptions = {},
): UseDisclosureReturn {
  const { defaultOpen = false, onOpen, onClose, onChange } = options;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
    onChange?.(true);
  }, [onOpen, onChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    onChange?.(false);
  }, [onClose, onChange]);

  const toggle = useCallback(() => {
    const newValue = !isOpen;
    setIsOpen(newValue);

    if (newValue) {
      onOpen?.();
    } else {
      onClose?.();
    }
    onChange?.(newValue);
  }, [isOpen, onOpen, onClose, onChange]);

  const handleSetIsOpen = useCallback(
    (value: boolean) => {
      setIsOpen(value);

      if (value) {
        onOpen?.();
      } else {
        onClose?.();
      }
      onChange?.(value);
    },
    [onOpen, onClose, onChange],
  );

  return {
    isOpen,
    open,
    close,
    onOpen: open, // alias for MUI/Chakra/Radix convention
    onClose: close, // alias for MUI/Chakra/Radix convention
    toggle,
    setIsOpen: handleSetIsOpen,
  };
}
