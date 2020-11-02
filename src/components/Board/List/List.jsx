import clsx from 'clsx';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Card from './Card/Card';

const List = () => {
  return (
    <div className="h-full">
      <div className="max-h-full pt-3 overflow-y-auto border border-transparent rounded-md list-col">
        <div className="flex items-center w-full cursor-pointer list-header">
          <span className="font-medium leading-10 text-text-header text-normal">
            Agenda
          </span>
          <button
            type="button"
            className="ml-auto text-gray-700 focus:outline-none"
          >
            <FiPlus className="text-lg" />
          </button>
        </div>
        <div className="board-column">
          <div className="scrollable-container">
            <div className="scrollable-area">
              <div
                className={clsx(
                  'flex flex-col mt-2',
                  'background-empty-list card-list'
                )}
              >
                <Card name="asdasd" />
                <Card name="asdasd" />
                <Card name="asdasd" />
                <Card name="asdasd" />
                <Card name="asdasd" />
                <Card name="asdasd" />
                <Card name="asdasd" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
