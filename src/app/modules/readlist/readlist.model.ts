import { Schema, model } from 'mongoose';
import { IReadlist, ReadlistModel } from './readlist.interface';

const readlistSchema = new Schema<IReadlist>(
    {
        user: { type: String, required: true },
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        planToRead: { type: Boolean },
        isReading: { type: Boolean },
        isFinished: { type: Boolean },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Readlist = model<IReadlist, ReadlistModel>('Readlist', readlistSchema);
