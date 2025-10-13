import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../stores';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMemoizedSelector = <T,>(
    selector: (state: RootState) => T
  ): T => {
    return useAppSelector(useMemo(() => selector, [selector]));
  };