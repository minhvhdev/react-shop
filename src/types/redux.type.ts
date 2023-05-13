import { AnyAction } from 'redux';

export interface IReduxState<T> {
  status: string;
  data: T;
  error: Record<string, unknown>;
}

export interface IExtraReducerStatusHandle {
  pen: (action: unknown, payload: AnyAction) => void;
  ful: (action: unknown, payload: AnyAction) => void;
  rej: (action: unknown, payload: AnyAction) => void;
}
