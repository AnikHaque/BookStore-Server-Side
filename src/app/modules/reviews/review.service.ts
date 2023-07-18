import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook, IReview } from '../books/book.interface';
import { Book } from '../books/book.model';

const updateReview = async (id: string, payload: IReview): Promise<IBook> => {
    const isExist = await Book.findById(id);
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found");
    }

    const result = await Book.findByIdAndUpdate(id, { $push: { reviews: payload } }, { new: true });
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update book');
    }

    return result;
};

export const ReviewService = {
    updateReview,
};
