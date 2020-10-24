import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Spin } from 'antd';

const NewBoardForm = ({ onSave, isLoading }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = (values) => {
    onSave(values.name, values.description, reset);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="name">
          <span className="px-0 mb-1 text-left tile-structure-name">Name</span>
          <input
            name="name"
            id="name"
            className={clsx(
              'w-full p-2 border border-gray-300 rounded-md focus:outline-none',
              errors.name && 'border-red-500'
            )}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^.{10,30}$/i,
                message:
                  'Invalid board name (at least 10 characters, max 30 characters).',
              },
            })}
          />
        </label>
        {errors.name && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.name.message}
          </span>
        )}

        <label className="mt-6" htmlFor="description">
          <span className="px-0 mb-1 text-left tile-structure-name">
            Description
          </span>
          <textarea
            name="description"
            id="description"
            className={clsx(
              'w-full p-2 border border-gray-300 rounded-md focus:outline-none',
              errors.description && 'border-red-500'
            )}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^.{10,100}$/i,
                message: 'invalid description (at least 10 characters)',
              },
            })}
          />
        </label>

        {errors.description && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.description.message}
          </span>
        )}

        <button
          className="mt-6 text-xs font-medium text-white bg-yellow-500 border rounded-lg focus:outline-none"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center h-10">
            {' '}
            {isLoading ? <Spin className="mt-1" /> : 'Save'}
          </div>
        </button>
      </div>
    </form>
  );
};

export default NewBoardForm;
