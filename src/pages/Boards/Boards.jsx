import React, { useState, useCallback, useEffect } from 'react';
import AddButton from '../../components/Boards/AddButton';
import BoardButton from '../../components/Boards/BoardButton';
import NewBoardModal from '../../components/Boards/NewBoardModal';
import { BoardService } from '../../services';

const Boards = () => {
  const [isModalShowing, setModalShowing] = useState(false);
  const [isLoadingAddNewBoard, setLoadingAddNewBoard] = useState(false);
  const [boards, setBoards] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const handleToggleModal = useCallback(() => {
    setModalShowing((prevShowing) => !prevShowing);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await BoardService.getBoards();
        console.log(data?.data);
        setBoards(() => data?.data || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [refresh]);

  const handleAddNewBoard = async (name, description) => {
    setLoadingAddNewBoard(true);
    try {
      const data = await BoardService.addBoard(name, description);
      console.log(data);
      setRefresh((currentRefresh) => !currentRefresh);
    } catch (err) {
      console.log(err);
    }
    setLoadingAddNewBoard(false);
  };

  const onDeleleSuccess = (idBoard) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board._id !== idBoard)
    );
  };

  const handleDeleteClick = useCallback(async (idBoard) => {
    try {
      const data = await BoardService.deleteBoard(idBoard);
      console.log(data);
      onDeleleSuccess(idBoard);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container flex flex-col mx-auto mt-10">
      <span className="w-full pb-3 text-3xl border-b border-gray-400">
        My Boards
      </span>

      <div className="flex flex-wrap w-full mt-8">
        <AddButton handleClick={handleToggleModal} />
        {boards?.length > 0 &&
          boards.map((board) => (
            <BoardButton
              key={board._id}
              name={board.name}
              id={board._id}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
      </div>
      <NewBoardModal
        visible={isModalShowing}
        onSave={handleAddNewBoard}
        handleCancel={handleToggleModal}
        isLoading={isLoadingAddNewBoard}
      />
    </div>
  );
};

export default Boards;
