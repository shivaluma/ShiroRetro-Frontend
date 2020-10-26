import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../../../app/slices/userSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-48 overflow-hidden">
      <button
        type="button"
        className="px-5 py-3 text-left text-gray-400 border-b border-gray-200 outline-none focus:outline-none hover:bg-gray-200"
      >
        Edit Profile
      </button>
      <button
        type="button"
        className="px-5 py-3 text-left text-gray-400 outline-none focus:outline-none hover:bg-gray-200"
        onClick={() => dispatch(signout())}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserMenu;
