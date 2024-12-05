// src/services/vector.service.ts
import { initPinecone } from '../utils/pineconeClient';
import { Document } from '../interfaces/document.interface';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI();

export class VectorService {
  private indexName = process.env.PINECONE_INDEX_NAME as string;

  public async queryPinecone(query: string): Promise<Document[]> {
    // Generar el embedding de la consulta
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Inicializar Pinecone y conectar al índice
    const pinecone = await initPinecone();
    const index = pinecone.Index(this.indexName);

    // Realizar la consulta
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5, // Ajusta según tus necesidades
      includeMetadata: true,
    });

    // Mapear los resultados a la interfaz Document
    const documents: Document[] = queryResponse.matches?.map((match) => ({
      id: match.id,
      texto: match.metadata?.texto as string,
    })) || [];

    return documents;
  }
}
