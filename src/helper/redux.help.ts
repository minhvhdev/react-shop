import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import { IExtraReducerStatusHandle, IReduxState } from '@types';

import { EXTRA_REDUCERS_STATUS } from '../constants';

const checkStatus = (type: string) => {
  return (action: AnyAction) => action.type.endsWith(type);
};

export const extraReducerStatusHandle = (
  builder: ActionReducerMapBuilder<IReduxState<unknown>>,
  handle: IExtraReducerStatusHandle
): void => {
  builder
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.PENDING), (action, payload) => {
      handle.pen(action, payload);
    })
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.FULFILLED), (action, payload) => {
      handle.ful(action, payload);
    })
    .addMatcher(checkStatus(EXTRA_REDUCERS_STATUS.REJECTED), (action, payload) => {
      handle.rej(action, payload);
    });
};
