import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

const Card = ({ data, editMode, onBlur, handleNameChange }) => {
  const ref = useRef(null);
  const nameRef = useRef(data.name);
  useEffect(() => {
    if (editMode) {
      ref.current.focus();
    }
  }, [editMode]);

  return (
    <div
      tabIndex={-1}
      contentEditable={editMode}
      onBlur={onBlur}
      ref={ref}
      onInput={handleNameChange}
      suppressContentEditableWarning
      placeholder="Write a task name..."
      className={clsx(
        'px-5 py-4 pb-16 mb-3 bg-white border rounded-lg focus:outline-none card-shadow hover:shadow-lg',
        editMode && 'border border-gray-500'
      )}
    >
      {nameRef.current}
    </div>
  );
};

export default Card;
