import express from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.post('/createNote', createNote);
router.put('/updateNote/:id', updateNote);
router.delete('/deleteNote/:id', deleteNote);

export default router;
