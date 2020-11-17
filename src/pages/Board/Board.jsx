import React, { useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import useLayout from '../../hooks/useLayout';
import List from '../../components/Board/List/List';
import { BoardService } from '../../services';
import CardService from '../../services/CardService';

const Board = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    (async function loadData() {
      const { data } = await new Promise((resolve) =>
        setTimeout(() => {
          resolve(BoardService.getBoard(match.params.idBoard));
        }, 400)
      );

      setBoard(() => data.data[0]);
      setLoading(false);
    })();
  }, [match.params.idBoard]);

  const Layout = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayout([
        () => (
          <div
            key="leftHeader"
            className="ml-2 text-xl font-medium text-gray-800"
          >
            <div className="flex flex-col max-h-full -mt-2 w-96">
              <Skeleton active paragraph={{ rows: 1 }} loading={loading}>
                <div className="p-1 leading-none truncate rounded-md outline-none w-96 focus:border focus:border-gray-200">
                  {board && board.name}
                </div>
                <span className="px-1 text-sm font-normal text-gray-600">
                  {board && board.description}
                </span>
              </Skeleton>
            </div>
          </div>
        ),
      ]),
    [loading, board]
  );

  const onDragEnd = (results) => {
    if (!results || !results.source || !results.destination) return;
    const sourceCardIndex = results.source.index;
    const destCardIndex = results.destination.index;
    const sourceList = board.lists.find(
      (el) => el._id === results.source.droppableId
    );
    const destList = board.lists.find(
      (el) => el._id === results.destination.droppableId
    );

    const sourceCards = sourceList.cards;
    const destCards = destList.cards;

    const card = { ...sourceCards[sourceCardIndex] };

    card.idList = destList._id;

    if (destCardIndex === 0) {
      if (destCards.length === 0) card.pos = 65535;
      else card.pos = destCards[0].pos + 65535;
    } else if (destCardIndex === destCards.length) {
      card.pos = destCards[destCards.length - 1].pos / 2;
    } else {
      card.pos =
        (destCards[destCardIndex - 1].pos + destCards[destCardIndex].pos) / 2;
    }

    sourceCards.splice(sourceCardIndex, 1);
    destCards.splice(destCardIndex, 0, card);

    CardService.updateCard(card);
  };

  // const getDraggedDom = (draggableId) => {
  //   const queryAttr = 'data-rbd-drag-handle-draggable-id';
  //   const domQuery = `[${queryAttr}='${draggableId}']`;
  //   const draggedDOM = document.querySelector(domQuery);

  //   return draggedDOM;
  // };

  // const onDragStart = (event) => {
  //   const draggedDOM = getDraggedDom(event.draggableId);

  //   if (!draggedDOM) {
  //     return;
  //   }

  //   const { clientHeight, clientWidth } = draggedDOM;
  //   const sourceIndex = event.source.index;
  //   const clientY =
  //     parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
  //     [...draggedDOM.parentNode.children]
  //       .slice(0, sourceIndex)
  //       .reduce((total, curr) => {
  //         const style = curr.currentStyle || window.getComputedStyle(curr);
  //         const marginBottom = parseFloat(style.marginBottom);
  //         return total + curr.clientHeight + marginBottom;
  //       }, 0);

  //   setPlaceholderProps({
  //     clientHeight,
  //     clientWidth,
  //     clientY,
  //     clientX: parseFloat(
  //       window.getComputedStyle(draggedDOM.parentNode).paddingLeft
  //     ),
  //   });
  // };

  const setList = (idList, newList) => {
    if (board) {
      const index = board.lists.findIndex((list) => list._id === idList);

      const newLists = [...board.lists];
      newLists[index] = newList;
      setBoard({ ...board, lists: newLists });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col flex-1 min-h-0 bg-background-1">
        <div className="flex flex-1 px-6 mt-6">
          {loading ? (
            <>
              <List />
              <List />
              <List />
            </>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              {board.lists.map((list, index) => (
                <List
                  key={list._id}
                  list={list}
                  setList={(newList) => setList(list._id, newList)}
                  listIndex={index}
                  idBoard={board._id}
                />
              ))}
            </DragDropContext>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Board;
