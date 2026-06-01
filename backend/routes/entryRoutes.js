import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

// GET all entries (sorted newest first)
router.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries', error: error.message });
  }
});

// GET single entry by ID
router.get('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entry', error: error.message });
  }
});

// POST create new entry
router.post('/entries', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newEntry = await Entry.create({ title, content });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entry', error: error.message });
  }
});

// DELETE entry by ID
router.delete('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    await entry.destroy();
    res.status(200).json({ message: 'Entry deleted successfully', entry });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entry', error: error.message });
  }
});

export default router;
