interface IEmailCallbacks<T> {
  genMessage: (data: T) => string;
  onSuccess: () => void;
  onError: () => void;
}
