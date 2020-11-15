import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Popover } from 'antd';
import { useDebounce } from '../../../../hooks';

const Card = ({
  isNew,
  data,
  editMode,
  onBlur,
  innerRef,
  handleNameChange,
  handleCardDelete,
  handleCardUpdate,
  ...rest
}) => {
  // const ref = useRef(null);
  const nameRef = useRef(data.name);
  // useEffect(() => {
  //   if (editMode) {
  //     ref.current.focus();
  //   }
  // }, [editMode]);
  const [oldCardEditMode, setOldCardEditMode] = useState(false);

  const [currentCard, setCurrentCard] = useState(() => data);

  const isFirstRun = React.createRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setCurrentCard((card) => ({ ...card }));
  }, [data]);

  const onDeleteCard = () => handleCardDelete(data._id);
  const onEditCard = () => {
    setOldCardEditMode(true);

    // try {
    //   const cell = ref.current;
    //   let range;
    //   let selection;
    //   if (document.body.createTextRange) {
    //     range = document.body.createTextRange();
    //     range.moveToElementText(cell);
    //     range.select();
    //   } else if (window.getSelection) {
    //     selection = window.getSelection();
    //     range = document.createRange();
    //     range.selectNodeContents(cell);
    //     selection.addRange(range);
    //   }
    // } catch (err) {}
  };

  const onOldCardBlur = () => {
    setOldCardEditMode(false);
  };

  const currentCardDebounce = useDebounce(currentCard, 300);

  const isInit = useRef(true);
  useEffect(() => {
    if (!isInit.current && !isNew) {
      handleCardUpdate(currentCardDebounce);
    }
    isInit.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardDebounce]);

  const handleCardDataChange = (field, newValue) => {
    setCurrentCard({ ...currentCard, [field]: newValue });
  };

  const onCardInput = isNew
    ? handleNameChange
    : (event) => handleCardDataChange('name', event.currentTarget.textContent);

  return (
    <div
      tabIndex={-1}
      contentEditable={editMode || oldCardEditMode}
      onBlur={!isNew ? onOldCardBlur : onBlur}
      ref={innerRef}
      {...rest}
      onInput={onCardInput}
      suppressContentEditableWarning
      placeholder="Write a task name..."
      className={clsx(
        'px-5 py-4 pb-16 mb-3 bg-white border group rounded-lg focus:outline-none card-shadow hover:shadow-lg relative ',
        editMode && 'border border-gray-500 cursor-text',
        oldCardEditMode && 'border border-gray-500 cursor-text',
        !editMode && !oldCardEditMode && 'cursor-move'
      )}
    >
      {!isNew && !oldCardEditMode && (
        <Popover
          placement="bottomLeft"
          content={() => (
            <div className="flex flex-col w-48 overflow-hidden group">
              <button
                type="button"
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300 focus:outline-none"
                onClick={onEditCard}
              >
                Edit task name
              </button>

              <button
                type="button"
                className="px-4 py-2 text-left text-red-600 cursor-pointer hover:bg-gray-300 focus:outline-none"
                onClick={onDeleteCard}
              >
                Delete task
              </button>
            </div>
          )}
          trigger="click"
        >
          <div className="absolute hidden p-2 text-xl bg-white border border-gray-300 rounded-md shadow-sm group-hover:block group-hover:opacity-100 menu-hover-card">
            <FiMoreHorizontal className="text-black" />
          </div>
        </Popover>
      )}

      {nameRef.current}
    </div>
  );
};

export default Card;
