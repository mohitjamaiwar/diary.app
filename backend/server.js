import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/Entry.js';
import entryRoutes from './routes/entryRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
sequelize.authenticate()
  .then(() => console.log('✓ MySQL connected successfully'))
  .catch((err) => console.error('✗ MySQL connection error:', err));

// Sync database models
sequelize.sync({ alter: true })
  .then(() => console.log('✓ Database synchronized'))
  .catch((err) => console.error('✗ Database sync error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api', entryRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
