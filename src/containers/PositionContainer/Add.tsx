import React from 'react';
import { useCreatePositionManagement } from './hook';
import PositionTemplate from './template';

const AddPositionContainer = () => {
  const { schema, position, setPosition, handleCancel, handleCreate } =
    useCreatePositionManagement();

  return (
    <PositionTemplate
      schema={schema}
      formData={position}
      onChange={(formData) => setPosition(formData)}
      onSubmit={handleCreate}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default AddPositionContainer;
