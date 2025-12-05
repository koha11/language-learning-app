import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { ChangePassword } from '@/modules/auth/services/auth.services';
import ChangePasswordForm from './changePasswordForm';
import type { ChangePasswordType } from '../types/user';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const ChangePasswordModal = ({ open, onChange }: { open: boolean; onChange: () => void }) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const { mutate, isPending } = useMutationWithToast(ChangePassword, {
    success: 'Change password success',
    error: 'Failed to change password',
  });

  useEffect(() => {
    setError(undefined);
  }, [open]);

  const handleChangePassword = (payload: ChangePasswordType) => {
    mutate(payload, {
      onSuccess: () => onChange(),
      onError: (error) => {
        if (error instanceof AxiosError === false) return;

        const msg = error?.response?.data?.message;

        if (msg) {
          setError(msg);
          return;
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Change Password</DialogTitle>
        </DialogHeader>

        <ChangePasswordForm
          onSubmit={handleChangePassword}
          isPending={isPending}
          onCancel={onChange}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
