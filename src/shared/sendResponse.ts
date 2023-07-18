import { Response } from 'express';

type IApiResponse<T> = {
    success: boolean;
    statusCode: number;
    message?: string | null;
    data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData: IApiResponse<T> = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
