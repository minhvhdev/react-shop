import { AxiosResponse } from "axios";

export default interface IResponse<T> extends AxiosResponse{
    data: T;
}