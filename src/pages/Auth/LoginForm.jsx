import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { useDispatch } from 'react-redux';
import { signin } from '../../app/slices/userSlice';

import { useLoading } from '../../hooks';

const LoginForm = ({ changeMode }) => {
  const { handleSubmit, register, errors, setError } = useForm();
  const [isLoading, changeLoading] = useLoading();
  const dispatch = useDispatch();

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const onSubmit = async (values) => {
    changeLoading();
    const response = await dispatch(signin(values));

    if (response && response?.data?.isError)
      setError('password', {
        type: 'manual',
        message: response.data.message,
      });
    changeLoading();
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
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address.',
              },
            })}
            autoComplete="on"
          />
        </label>
        {errors.email && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.email.message}
          </span>
        )}

        <label className="mt-4" htmlFor="password">
          <span className="px-0 mb-1 text-left tile-structure-name">
            Password
          </span>
          <input
            name="password"
            id="password"
            type="password"
            className={clsx(
              'w-full p-2 border border-gray-230 rounded-md focus:outline-none',
              errors.password && 'border-red-500'
            )}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and be longer than seven characters.',
              },
            })}
            autoComplete="on"
          />
        </label>

        {errors.password && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.password.message}
          </span>
        )}

        <button
          className="mt-8 text-xs font-medium text-white border rounded-lg focus:outline-none bg-background-button"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center h-10">Log In</div>
        </button>

        <span className="mt-6 text-xs text-center text-gray-400">
          Don&apos;t have an account?
          <button
            type="button"
            className="ml-2 text-background-button focus:outline-none"
            onClick={changeMode}
          >
            Sign Up
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
