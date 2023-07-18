import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReadlist } from './readlist.interface';
import { ReadlistService } from './readlist.service';
import httpStatus from 'http-status';

const createReadlist = catchAsync(async (req: Request, res: Response) => {
    const readlistData = req.body;

    const result = await ReadlistService.createReadlist(readlistData);

    sendResponse<IReadlist>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Readlist created successfully',
        data: result,
    });
});

const getAllReadlist = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.params;

    const result = await ReadlistService.getAllReadlist(email);

    sendResponse<IReadlist[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Readlists retrieved successfully',
        data: result,
    });
});

const updateReadlist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await ReadlistService.updateReadlist(id, updatedData);

    sendResponse<IReadlist>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Readlist updated successfully',
        data: result,
    });
});

export const ReadlistController = {
    createReadlist,
    getAllReadlist,
    updateReadlist,
};
