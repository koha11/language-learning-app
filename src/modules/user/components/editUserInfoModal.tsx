import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { editUserInfo } from '../services/user.services';
import UserInfoForm from './userInfoForm';
import type { UserInfoType } from '../types/user';

const EditUserInfoModal = ({
  open,
  onChange,
  initialData,
}: {
  open: boolean;
  onChange: () => void;
  initialData: UserInfoType;
}) => {
  const { mutate, isPending } = useMutationWithToast(editUserInfo, {
    invalidateKeys: ['me'],
    success: 'User info updated successfully!',
    error: 'Failed to update user info. Please try again.',
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
          initialData={initialData}
          onSubmit={handleAddFlashcard}
          isPending={isPending}
          onCancel={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserInfoModal;
