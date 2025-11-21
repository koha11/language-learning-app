import CollectionForm from '../components/collectionForm';
import type { FormCollectionType } from '../types/collection';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { createCollection } from '../services/collection.services';
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutationWithToast(createCollection, {
    invalidateKeys: ['collections'],
  });

  const handleCreateCollection = (payload: FormCollectionType) => {
    mutate(payload, {
      onSuccess: () => {
        navigate('/collections');
      },
    });
  };
  
  return (
    <div className="container mx-auto py-10">
      <CollectionForm
        onSubmit={handleCreateCollection}
        initialData={undefined}
        isEditing={false}
        isPending={isPending}
      />
    </div>
  );
};

export default AddCollection;
