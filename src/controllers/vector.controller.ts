// src/controllers/vector.controller.ts
import { Request, Response } from 'express';
import { VectorService } from '../services/vector.service';

const vectorService = new VectorService();

export class VectorController {
  public getRelevantDocuments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query } = req.body;

      if (!query) {
        res.status(400).json({ error: 'La consulta es requerida.' });
        return;
      }

      const documents = await vectorService.queryPinecone(query);
      res.json(documents);
    } catch (error) {
      console.error('Error en getRelevantDocuments:', error);
      res.status(500).json({ error: 'Error al obtener documentos relevantes.' });
    }
  };
}
