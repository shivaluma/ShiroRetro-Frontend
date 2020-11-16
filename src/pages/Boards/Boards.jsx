import React, { useState, useCallback, useEffect, useMemo } from 'react';
import AddButton from '../../components/Boards/AddButton';
import BoardButton from '../../components/Boards/BoardButton';
import NewBoardModal from '../../components/Boards/NewBoardModal';

import Loading from '../../components/Loading';
import useLayout from '../../hooks/useLayout';
import { BoardService } from '../../services';

const Boards = ({ history }) => {
  const [isModalShowing, setModalShowing] = useState(false);
  const [isInitLoading, setInitLoading] = useState(true);
  const [isLoadingAddNewBoard, setLoadingAddNewBoard] = useState(false);
  const [boards, setBoards] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [currentUpdateBoard, setCurrentUpdateBoard] = useState(null);

  const handleToggleModal = useCallback(() => {
    setCurrentUpdateBoard(() => null);
    setModalShowing((prevShowing) => !prevShowing);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await BoardService.getBoards();
        setBoards(() => data?.data || []);
        setInitLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [refresh]);

  const handleAddNewBoard = async (name, description, reset) => {
    setLoadingAddNewBoard(true);

    try {
      const data = await BoardService.addBoard(name, description);

      history.push(`/b/${data.data.data._id}`);
      return;
    } catch (err) {
      console.log(err);
    }
    setLoadingAddNewBoard(false);
  };

  const handleUpdateBoard = async (board) => {
    setLoadingAddNewBoard(true);

    try {
      const data = await BoardService.updateBoard(
        currentUpdateBoard._id,
        board.name,
        board.description
      );

      setRefresh((currentRefresh) => !currentRefresh);
      setModalShowing(() => false);
      setCurrentUpdateBoard(null);
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
      onDeleleSuccess(idBoard);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const Layout = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayout([
        () => (
          <div
            key="leftHeader"
            className="ml-2 text-xl font-medium text-gray-800"
          >
            Boards
          </div>
        ),
      ]),
    []
  );

  const handleUpdateClick = (board) => {
    setCurrentUpdateBoard(() => board);
    setModalShowing(() => true);
  };

  return isInitLoading ? (
    <Loading />
  ) : (
    <Layout>
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
                shortId={board.shortId}
                isModalShowing={isModalShowing}
                handleUpdateClick={() => handleUpdateClick(board)}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
        </div>
      </div>
      <NewBoardModal
        visible={isModalShowing}
        onSave={handleAddNewBoard}
        onUpdate={handleUpdateBoard}
        handleCancel={handleToggleModal}
        isLoading={isLoadingAddNewBoard}
        board={currentUpdateBoard}
      />
    </Layout>
  );
};

export default Boards;
