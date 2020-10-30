import React, { useMemo } from 'react';
import { Skeleton } from 'antd';
import useLayout from '../../hooks/useLayout';

const Board = () => {
  const Layout = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayout([
        () => (
          <div
            key="leftHeader"
            className="ml-2 text-xl font-medium text-gray-800"
          >
            <div className="flex flex-col max-h-full w-96">
              <Skeleton active paragraph={{ rows: 1 }}>
                <div className="p-1 truncate rounded-md outline-none w-96 focus:border focus:border-gray-200">
                  Sample board sample board sample board sample board sample
                  board sample
                </div>
                <span className="px-1 text-sm font-normal text-gray-600">
                  current board is fakwjfklajwlkfjnmalkwmclawjfndl jawhkhwkajf
                </span>
              </Skeleton>
            </div>
          </div>
        ),
      ]),
    []
  );
  return (
    <Layout>
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 px-6 mt-6">asdajsd</div>
      </div>
    </Layout>
  );
};

export default Board;
