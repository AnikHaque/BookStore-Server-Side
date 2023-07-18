import express from 'express';
import { ReadlistController } from './readlist.controller';

const router = express.Router();

router.post('/', ReadlistController.createReadlist);

router.get('/:email', ReadlistController.getAllReadlist);

router.patch('/:id', ReadlistController.updateReadlist);

export const ReadlistRoutes = router;
