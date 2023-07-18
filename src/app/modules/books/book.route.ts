import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
const router = express.Router();

router.post('/', validateRequest(BookValidation.createBookZodSchema), BookController.createBook);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

router.patch('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
