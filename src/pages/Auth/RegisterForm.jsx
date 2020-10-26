import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { Result } from 'antd';
import { signup } from '../../app/slices/userSlice';
import { changeLoading } from '../../app/slices/loadingSlice';

const RegisterForm = ({ changeMode }) => {
  const { handleSubmit, register, errors, setError } = useForm();
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const onSubmit = async (values) => {
    dispatch(changeLoading());
    const response = await dispatch(signup(values));
    console.log(response);
    if (response && response.data.isError) {
      response.data.err.fields.forEach((field) =>
        setError(field, {
          type: 'manual',
          message: response.data.message,
        })
      );
    } else {
      setRegisterSuccess(true);
    }
    dispatch(changeLoading());
  };

  return isRegisterSuccess ? (
    <Result
      status="success"
      title="Register Success"
      subTitle="You could login using your account right now."
      extra={[
        <button
          key="backtologin"
          type="button"
          className="px-3 py-2 text-white rounded-md bg-background-button"
          onClick={changeMode}
        >
          Back to login
        </button>,
      ]}
    />
  ) : (
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
              errors.email && 'border-red-500'
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

        <label className="mt-4" htmlFor="confirmPassword">
          <span className="px-0 mb-1 text-left tile-structure-name">
            Confirm Password
          </span>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            className={clsx(
              'w-full p-2 border border-gray-230 rounded-md focus:outline-none',
              errors.confirmPassword && 'border-red-500'
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

        {errors.confirmPassword && (
          <span className="mt-1 text-xs font-medium text-red-600">
            {errors.confirmPassword.message}
          </span>
        )}

        <button
          className="mt-8 text-xs font-medium text-white border rounded-lg focus:outline-none bg-background-button"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center h-10">
            Create Account
          </div>
        </button>

        <span className="mt-6 text-xs text-center text-gray-400">
          Already have an account?
          <button
            type="button"
            className="ml-2 text-background-button focus:outline-none"
            onClick={changeMode}
          >
            Login
          </button>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
