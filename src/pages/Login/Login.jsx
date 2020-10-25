import React from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import Logo from '../../components/Logo';
import LoginForm from './Form';

const Login = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background-1">
      <div className="w-auto">
        <div className="bg-white login-content ">
          <div className="relative flex items-center justify-center w-auto p-3 mb-8 bg-yellow-600 rounded-xl">
            <Logo className="absolute left-0 w-8 h-8 ml-5 rounded-sm" />
            <span className="ml-3 text-lg text-text-1">
              Sprint Retrospective
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="mb-5 text-xl text-center text-text-1">
              Login by Socials
            </span>
            <div className="flex w-full gap-5">
              <button
                type="button"
                className="flex items-center px-12 py-4 text-red-700 transition-all duration-300 border rounded-lg border-gray-230 hover:bg-red-700 hover:text-white focus:outline-none"
              >
                <FaGoogle />
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center px-12 py-4 text-blue-700 transition-all duration-300 border rounded-lg border-gray-230 hover:bg-blue-700 hover:text-white focus:outline-none"
              >
                <FaFacebookF />
                <span className="ml-2">Facebook</span>
              </button>
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="flex-1 border-t border-gray-300" />
              <span className="px-1 text-gray-300">or</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
