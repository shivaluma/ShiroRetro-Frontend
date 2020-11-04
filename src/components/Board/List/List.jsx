import clsx from 'clsx';
import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { FiPlus } from 'react-icons/fi';
import CardService from '../../../services/CardService';
import Card from './Card/Card';

const List = ({ data, idBoard }) => {
  const [editMode, setEditMode] = useState(false);
  const [cardEditMode, setCardEditMode] = useState(true);
  const [list, setList] = useState(() => data);
  const [tmpCard, setTmpCard] = useState(null);
  const handleChangeListName = (event) => {
    setList((prevList) => ({
      ...prevList,
      name: event.target.value,
    }));
  };
  const handleToggleEditMode = () => {
    if (editMode === true) return;
    setEditMode((prev) => !prev);
  };

  const handleOffEditMode = () => {
    setEditMode(false);
  };

  const handleAddCardClick = () => {
    if (tmpCard) {
      setTmpCard(null);
      setTimeout(() => setTmpCard({ pos: 9999999 }), 100);
    } else setTmpCard({ pos: 9999999 });
    setCardEditMode(true);
  };

  const handleCardNameChange = (event) => {
    console.log('Tmp card change');
    setTmpCard({ ...tmpCard, name: event.currentTarget.textContent });
  };

  const handleCardOnBlur = async () => {
    if (!tmpCard.name) {
      setTmpCard(null);
      return;
    }
    setCardEditMode(false);
    const lastPos = list.cards.length > 0 ? list.cards[0].pos : 0;
    if (!tmpCard._id) {
      const response = await CardService.addCard(
        tmpCard.name,
        '',
        lastPos,
        list._id,
        idBoard
      );

      if (!response.isError) {
        setTmpCard(null);
        setList({ ...list, cards: [response.data, ...list.cards] });
      }
    }
  };

  const handleCardDelete = async (id) => {
    console.log(`card delete${id}`);
    try {
      await CardService.removeCard(id);
      const newCards = list.cards.filter((card) => card._id !== id);
      setList({ ...list, cards: newCards });
    } catch (err) {}
  };

  const handleCardUpdate = async (card) => {
    try {
      const response = await CardService.updateCard(card);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return data ? (
    <div className="h-full">
      <div className="max-h-full pt-3 overflow-y-auto border border-transparent rounded-md list-col">
        <div className="flex items-center w-full cursor-pointer list-header">
          <input
            onClick={handleToggleEditMode}
            onBlur={handleOffEditMode}
            onChange={handleChangeListName}
            className={clsx(
              'font-medium leading-10 bg-transparent  text-text-header text-normal outline-none focus:outline-none overflow-hidden mr-3 flex-1 h-10 single-line',
              editMode &&
                'px-2 border border-gray-500 rounded-md w-full text-left',
              !editMode && 'truncate'
            )}
            value={list.name}
          />

          <button
            type="button"
            className="ml-auto text-gray-700 focus:outline-none"
            onClick={handleAddCardClick}
          >
            <FiPlus className="text-lg" />
          </button>
        </div>
        <div className="board-column">
          <div className="scrollable-container">
            <div className="scrollable-area">
              <div className={clsx('flex flex-col', 'card-list')}>
                {tmpCard && (
                  <Card
                    isNew
                    data={tmpCard}
                    editMode={cardEditMode}
                    onBlur={handleCardOnBlur}
                    handleNameChange={handleCardNameChange}
                  />
                )}
                {list.cards.map((card) => (
                  <Card
                    isNew={false}
                    key={card._id}
                    data={card}
                    handleCardDelete={handleCardDelete}
                    handleCardUpdate={handleCardUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full">
      <div className="max-h-full pt-3 overflow-y-auto border border-transparent rounded-md list-col">
        <div className="flex items-center w-full cursor-pointer list-header">
          <span className="font-medium leading-10 text-text-header text-normal">
            <ContentLoader
              className="rounded-md"
              viewBox="0 0 180 40"
              height={40}
              width={180}
            >
              <rect x="0" y="0" rx="0" ry="0" width="180" height="40" />
            </ContentLoader>
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
              <div className={clsx('flex flex-col', 'card-list')}>
                <ContentLoader
                  className="rounded-lg"
                  viewBox="0 0 282 104"
                  height={104}
                  width={282}
                >
                  <rect x="0" y="0" rx="0" ry="0" width="282" height="104" />
                </ContentLoader>
                <ContentLoader
                  className="mt-3 rounded-lg"
                  viewBox="0 0 282 104"
                  height={104}
                  width={282}
                >
                  <rect x="0" y="0" rx="0" ry="0" width="282" height="104" />
                </ContentLoader>
                <ContentLoader
                  className="mt-3 rounded-lg"
                  viewBox="0 0 282 104"
                  height={104}
                  width={282}
                >
                  <rect x="0" y="0" rx="0" ry="0" width="282" height="104" />
                </ContentLoader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
