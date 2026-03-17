/**
 * Modal Component - Dialogs and confirmation windows.
 *
 * @example
 * ```tsx
 * import { Modal, Button } from '@orion-ds/react';
 *
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
 *   <Modal.Header>Confirm Action</Modal.Header>
 *   <Modal.Body>Are you sure you want to proceed?</Modal.Body>
 *   <Modal.Footer>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export { Modal } from "./Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from "./Modal.types";
