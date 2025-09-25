import express from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = express.Router();


router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/createNote', createNote);
router.put('/updateNote/:id', updateNote);
router.delete('/deleteNote/:id', deleteNote);

export default router;
