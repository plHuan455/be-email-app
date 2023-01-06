import React from 'react';
import { useEditPositionManagement } from './hook';
import PositionTemplate from './template';

const EditPositionContainer = () => {
  const { schema, position, setPosition, handleCancel, handleEdit } =
    useEditPositionManagement();

  if (position.id === -1) return <div>Loading...</div>;

  return (
    <PositionTemplate
      schema={schema}
      formData={position}
      onChange={(formData) => setPosition(formData)}
      onSubmit={handleEdit}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default EditPositionContainer;
