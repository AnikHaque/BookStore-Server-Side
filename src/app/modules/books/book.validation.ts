import { z } from 'zod';

const createBookZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is Required',
        }),
        cover: z.string({
            required_error: 'Cover is Required',
        }),
        author: z.string().array().nonempty({
            message: 'Author Name is Required',
        }),
        genre: z.string({
            required_error: 'Genre is Required',
        }),
        publicationDate: z.coerce.date({
            required_error: 'Publication Date is Required',
        }),
        publisher: z.object({
            name: z.string({
                required_error: 'Publisher name is Required',
            }),
            email: z
                .string({
                    required_error: 'Publisher email is Required',
                })
                .email({ message: 'Must be a valid email' }),
        }),
        reviews: z
            .object({
                user: z.string({ required_error: 'User Review is Required' }).email({ message: 'Must be a valid email' }),
                comment: z.string({ required_error: 'Reviews is Required' }),
            })
            .array(),
        rating: z.number({
            required_error: 'Rating is Required',
        }),
        price: z.number({
            required_error: 'Price is Required',
        }),
        synopsis: z.string({
            required_error: 'Synopsis is Required',
        }),
    }),
});

export const BookValidation = {
    createBookZodSchema,
};
