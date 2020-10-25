import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Spin } from 'antd';

const LoginForm = ({ onLogin, isLoading }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = (values) => {
    onLogin(values.name, values.password, reset);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="email">
          <span className="px-0 mb-1 text-left tile-structure-name ">
            Email
          </span>
          <input
            name="email"
            id="email"
            className={clsx(
              'w-full p-2 border border-gray-230 rounded-md focus:outline-none',
              errors.name && 'border-red-500'
            )}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^.{10,40}$/i,
                message:
                  'Invalid email (at least 10 characters, max 40 characters).',
              },
            })}
          />
        </label>
        {errors.email && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.email.message}
          </span>
        )}

        <label className="mt-6" htmlFor="password">
          <span className="px-0 mb-1 text-left tile-structure-name">
            Password
          </span>
          <input
            name="password"
            id="password"
            className={clsx(
              'w-full p-2 border border-gray-230 rounded-md focus:outline-none',
              errors.password && 'border-red-500'
            )}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^.{10,100}$/i,
                message: 'invalid password (at least 10 characters)',
              },
            })}
          />
        </label>

        {errors.password && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.password.message}
          </span>
        )}

        <button
          className="mt-6 text-xs font-medium text-white border rounded-lg focus:outline-none bg-background-button"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center h-10">
            {' '}
            {isLoading ? <Spin className="mt-1" /> : 'Log In'}
          </div>
        </button>

        <span className="mt-6 text-xs text-center text-gray-400">
          Don&apos;t have an account? Sign Up
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
