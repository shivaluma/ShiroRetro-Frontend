import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoading } from '../app/slices/loadingSlice';

const useLoading = () => {
  const status = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const toggle = useCallback(() => dispatch(changeLoading()), [dispatch]);

  return [status, toggle];
};

export default useLoading;
