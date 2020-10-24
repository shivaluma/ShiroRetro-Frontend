import React from 'react';

const UserMenu = () => {
  return (
    <div className="flex flex-col w-48 overflow-hidden">
      <span className="px-5 py-3 text-gray-400 border-b border-gray-200 hover:bg-gray-200">
        Edit Profile
      </span>
      <span className="px-5 py-3 text-gray-400 hover:bg-gray-200">
        Sign Out
      </span>
    </div>
  );
};

export default UserMenu;
