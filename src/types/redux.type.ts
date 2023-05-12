export interface IReduxState<T> {
  status: string;
  data: T;
  error: {};
}

export interface IExtraReducerStatusHandle {
  pen: Object;
  ful: Function;
  rej: Object;
}
