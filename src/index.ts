// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vectorRoutes from './routes/vector.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Configura CORS según tus necesidades
app.use(express.json());

app.use('/api', vectorRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
