import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        cover: { type: String, required: true },
        author: { type: [String], required: true },
        genre: { type: String, required: true },
        publicationDate: { type: Date, required: true },
        publisher: {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
        reviews: {
            type: [
                {
                    _id: false,
                    user: { type: String, required: true },
                    comment: { type: String, required: true },
                },
            ],
        },
        rating: { type: Number, required: true },
        price: { type: Number, required: true },
        synopsis: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
