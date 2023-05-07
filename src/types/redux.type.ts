export interface IReduxState {
  status: string;
  data: any;
  error: {};
}

export interface IExtraReducerStatusHandle {
  pen: Object;
  ful: Function;
  rej: Object;
}
