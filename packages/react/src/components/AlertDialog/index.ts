/**
 * AlertDialog Component - Confirmation dialogs that force a user response.
 *
 * @example
 * ```tsx
 * import { AlertDialog, Button } from '@orion-ds/react';
 *
 * <AlertDialog open={open} onClose={handleClose}>
 *   <AlertDialog.Icon variant="danger" />
 *   <AlertDialog.Title>Delete account?</AlertDialog.Title>
 *   <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
 *   <AlertDialog.Actions>
 *     <Button variant="ghost" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Delete</Button>
 *   </AlertDialog.Actions>
 * </AlertDialog>
 * ```
 */
export { AlertDialog } from "./AlertDialog";
export type {
  AlertDialogProps,
  AlertDialogVariant,
  AlertDialogIconProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionsProps,
} from "./AlertDialog.types";
