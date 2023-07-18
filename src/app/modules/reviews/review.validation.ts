import { z } from 'zod';

const updateReviewZodSchema = z.object({
    body: z.object({
        user: z.string({ required_error: 'User Review is Required' }).email({ message: 'Must be a valid email' }),
        comment: z.string({ required_error: 'Reviews is Required' }),
    }),
});

export const ReviewValidation = {
    updateReviewZodSchema,
};
