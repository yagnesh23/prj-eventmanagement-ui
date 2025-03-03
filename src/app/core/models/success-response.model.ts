export interface SuccessResponse<T> {
    status: number | string;
    message: string;
    data: T;
    timeStamp: number;
}