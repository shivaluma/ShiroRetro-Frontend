import { Popover } from 'antd';
import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { SiTrello } from 'react-icons/si';
import { Link, useHistory } from 'react-router-dom';

const BoardButton = ({
  name,
  id,
  shortId,
  handleDeleteClick,
  handleUpdateClick,
  isModalShowing,
}) => {
  const [showing, setIsShowing] = useState(false);

  const onClick = (event) => {
    event.stopPropagation();
    handleDeleteClick(id);
  };
  const history = useHistory();
  const onButtonClick = () => {
    return history.push(`/b/${id}`);
  };
  const onUpdateButtonClick = (event) => {
    event.stopPropagation();
    setIsShowing(false);
    handleUpdateClick();
  };

  return (
    <div className="relative duration-300 transform group hover:-translate-y-2 ">
      <button
        type="button"
        onClick={onButtonClick}
        className="flex outline-none tile-structure hover:bg-gray-200 focus:outline-none"
      >
        <div className="w-32 h-32">
          <div className="text-4xl text-white bg-yellow-500 box-button">
            <SiTrello />
          </div>
        </div>

        <span className="tile-structure-name">{name}</span>
      </button>

      {!isModalShowing && (
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
                onClick={onUpdateButtonClick}
              >
                Edit Name & Description
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
          <button
            type="button"
            className="absolute z-30 hidden p-2 text-xl rounded-lg outline-none group-hover:block focus:outline-none group-hover:opacity-100 menu-hover hover:bg-gray-250 hover:bg-opacity-25"
          >
            <FiMoreHorizontal className="text-white" />
          </button>
        </Popover>
      )}
    </div>
  );
};

export default BoardButton;
