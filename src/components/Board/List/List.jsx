import React from 'react';
import { FiPlus } from 'react-icons/fi';

const List = () => {
  return (
    <div className="h-full">
      <div className="pt-3 border border-transparent rounded-md list-col">
        <div className="flex items-center w-full cursor-pointer list-header">
          <span className="font-medium leading-10 text-text-header text-normal">
            Agenda
          </span>
          <button type="button" className="ml-auto text-gray-700">
            <FiPlus className="text-lg" />
          </button>
        </div>

        <div className="flex flex-col mt-2">
          <div className="px-3 py-4 pb-16 bg-white border rounded-lg card-shadow">
            asdasd
          </div>
          <div className="px-3 py-4 pb-16 mt-3 bg-white border rounded-lg card-shadow">
            asdasd
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
