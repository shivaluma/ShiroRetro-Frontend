import { Popover } from 'antd';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { SiTrello } from 'react-icons/si';
import { useHistory } from 'react-router-dom';

const BoardButton = ({ name, id, shortId, handleDeleteClick }) => {
  const onClick = () => handleDeleteClick(id);
  const history = useHistory();
  const onButtonClick = () => {
    return history.push(`/b/${id}`);
  };
  return (
    <button
      onClick={onButtonClick}
      type="button"
      className="relative duration-300 transform outline-none tile-structure hover:bg-gray-200 hover:-translate-y-2 focus:outline-none group"
    >
      <div className="w-32 h-32">
        <div className="text-4xl text-white bg-yellow-500 box-button">
          <SiTrello />
        </div>
      </div>

      <Popover
        placement="bottomLeft"
        content={() => (
          <div className="flex flex-col w-auto py-2">
            <button
              type="button"
              className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300 focus:outline-none"
              onClick={onClick}
            >
              Delete
            </button>
            <button
              type="button"
              className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300 focus:outline-none"
            >
              Copy Board Link
            </button>
            <button
              type="button"
              className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300 focus:outline-none"
            >
              Share...
            </button>
          </div>
        )}
        trigger="click"
      >
        <div className="absolute hidden text-xl group-hover:block group-hover:opacity-100 menu-hover">
          <FiMoreHorizontal className="text-white" />
        </div>
      </Popover>

      <span className="tile-structure-name">{name}</span>
    </button>
  );
};

export default BoardButton;
