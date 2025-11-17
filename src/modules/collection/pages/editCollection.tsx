import React from 'react';
import CollectionForm from '../components/collectionForm';
import type { CollectionDetailType } from '../types/collection';
import { useParams } from 'react-router-dom';
import { useGetCollectionById } from '../hooks/collection.hooks';

const EditCollection = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetCollectionById(id!);

  const handleEditCollection = (collection: CollectionDetailType) => {};

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div className=" container mx-auto py-10">
      <CollectionForm onSubmit={handleEditCollection} initialData={data} isEditing={true} />
    </div>
  );
};

export default EditCollection;
