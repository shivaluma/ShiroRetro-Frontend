import React, { useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import useLayout from '../../hooks/useLayout';
import List from '../../components/Board/List/List';
import { BoardService } from '../../services';

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
            board.lists.map((list) => (
              <List key={list._id} data={list} idBoard={board._id} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Board;
