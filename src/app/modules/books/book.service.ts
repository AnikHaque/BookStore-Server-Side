import { SortOrder } from 'mongoose';
import { isFilterOption } from '../../../shared/filterOption';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters, IBookFilterOptions } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (payload: IBook): Promise<IBook> => {
    const newBook = new Book(payload);
    const result = await newBook.save();
    return result;
};

const getAllBooks = async (filters: IBookFilters, filterOptions: IBookFilterOptions): Promise<IBook[]> => {
    const { query, ...filterField } = filters;
    const { limit, sortBy, sortOrder } = isFilterOption(filterOptions);

    const andConditions = [];

    if (query) {
        andConditions.push({
            $or: bookSearchableFields.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filterField).length) {
        andConditions.push({
            $and: Object.entries(filterField).map(([field, value]) => ({
                [field]: {
                    $regex: value,
                    $options: 'i',
                },
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Book.find(whereConditions).sort(sortConditions).limit(limit);

    return result;
};

const getSingleBook = async (id: string): Promise<IBook> => {
    const result = await Book.findById(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get book');
    }

    return result;
};

const updateBook = async (id: string, payload: Partial<IBook>): Promise<IBook> => {
    const isExist = await Book.findById(id);
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found");
    }

    const { publisher, ...bookData } = payload;
    const updatedBookData: Partial<IBook> = { ...bookData };

    if (publisher && Object.keys(publisher).length > 0) {
        Object.keys(publisher).forEach(key => {
            const publisherKey = `publisher.${key}` as keyof Partial<IBook>;
            (updatedBookData as any)[publisherKey] = publisher[key as keyof typeof publisher];
        });
    }

    const result = await Book.findByIdAndUpdate(id, updatedBookData, { new: true });
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update book');
    }

    return result;
};

const deleteBook = async (id: string): Promise<IBook> => {
    const isExist = await Book.findById(id);
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found");
    }

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete book');
    }

    return result;
};

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
