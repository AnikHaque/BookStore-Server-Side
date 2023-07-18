import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import pick from '../../../shared/pick';
import { filterOptionConstant } from '../../../shared/filterOption';
import { bookFilterableFields } from './book.constant';

const createBook = catchAsync(async (req: Request, res: Response) => {
    const bookData = req.body;

    const result = await BookService.createBook(bookData);

    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book created successfully',
        data: result,
    });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const filterOptions = pick(req.query, filterOptionConstant);

    const result = await BookService.getAllBooks(filters, filterOptions);

    sendResponse<IBook[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Books retrieved successfully',
        data: result,
    });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BookService.getSingleBook(id);

    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book retrieved successfully',
        data: result,
    });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await BookService.updateBook(id, updatedData);

    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book updated successfully',
        data: result,
    });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BookService.deleteBook(id);

    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book deleted successfully',
        data: result,
    });
});

export const BookController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook,
};
