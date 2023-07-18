import { Document, Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';

export interface IReadlist extends Document {
    user: string;
    book: Types.ObjectId | IBook;
    planToRead: boolean;
    isReading: boolean;
    isFinished: boolean;
}

export type ReadlistModel = Model<IReadlist, Record<string, unknown>>;
