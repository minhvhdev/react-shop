import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IExtraReducerStatusHandle, IReduxState } from '@types';
import { EXTRA_REDUCERS_STATUS } from '../constants';

const checkStatus = (type: string) => {
  return (action: any) => action.type.endsWith(type);
};

export const extraReducerStatusHandle = (
  builder: ActionReducerMapBuilder<IReduxState<any>>,
  handle: IExtraReducerStatusHandle
): void => {
  builder
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.FULFILLED), (state, action) => {
      handle.ful(state, action);
    })
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.FULFILLED), (state, action) => {
      handle.ful(state, action);
    })
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.FULFILLED), (state, action) => {
      handle.ful(state, action);
    });
};
