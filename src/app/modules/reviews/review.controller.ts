import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ReviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from '../books/book.interface';
import httpStatus from 'http-status';

const updateReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await ReviewService.updateReview(id, updatedData);

    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review updated successfully',
        data: result,
    });
});

export const ReviewController = {
    updateReview,
};
