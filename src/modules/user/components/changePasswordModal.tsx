import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { ChangePassword } from '@/modules/auth/services/auth.services';
import ChangePasswordForm from './changePasswordForm';
import type { ChangePasswordType } from '../types/user';

const ChangePasswordModal = ({ open, onChange }: { open: boolean; onChange: () => void }) => {
    const { mutate, isPending } = useMutationWithToast(ChangePassword, {
        success: 'Change password success',
        error: 'Failed to change password',
    });

    const handleChangePassword = (payload: ChangePasswordType) => {
        mutate(payload);
        onChange();
    };

    return (
        <Dialog open={open} onOpenChange={onChange}>
            <DialogContent className="min-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Change Password</DialogTitle>
                </DialogHeader>

                <ChangePasswordForm onSubmit={handleChangePassword} isPending={isPending} onCancel={onChange} />
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordModal;
