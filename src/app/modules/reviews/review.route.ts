import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import express from 'express';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.patch('/:id', validateRequest(ReviewValidation.updateReviewZodSchema), ReviewController.updateReview);

export const ReviewRoutes = router;
