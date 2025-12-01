import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { editUserInfo } from '../services/user.services';
import UserInfoForm from './userInfoForm';
import type { UserInfoType } from '../types/user';

const EditUserInfoModal = ({ open, onChange }: { open: boolean; onChange: () => void }) => {
    const { mutate, isPending } = useMutationWithToast(editUserInfo, {
    });

    const handleAddFlashcard = (payload: UserInfoType) => {
        mutate(payload);
        onChange();
    };

    return (
        <Dialog open={open} onOpenChange={onChange}>
            <DialogContent className="min-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Edit User Info</DialogTitle>
                </DialogHeader>

                <UserInfoForm
                    initialData={{ name: "Test name", dob: "2004-01-01" }}
                    onSubmit={handleAddFlashcard}
                    isPending={isPending}
                    onCancel={onChange}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditUserInfoModal;
