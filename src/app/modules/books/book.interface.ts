import { Document, Model } from 'mongoose';

export interface IPublisher {
    name: string;
    email: string;
}

export interface IReview {
    user: string;
    comment: string;
}

export interface IBook extends Document {
    title: string;
    cover: string;
    author: string[];
    genre: string;
    publicationDate: Date;
    publisher: IPublisher;
    reviews: IReview[];
    rating: number;
    price: number;
    synopsis: string;
}

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
    query?: string;
    genre?: string;
    publicationYear?: string;
};

export type IBookFilterOptions = {
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
