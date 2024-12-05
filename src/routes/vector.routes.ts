// src/routes/vector.routes.ts
import { Router } from 'express';
import { VectorController } from '../controllers/vector.controller';

const router = Router();
const vectorController = new VectorController();

router.post('/relevant-documents', vectorController.getRelevantDocuments);

export default router;
