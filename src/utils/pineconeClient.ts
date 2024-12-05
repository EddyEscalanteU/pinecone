// src/utils/pineconeClient.ts
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

export async function initPinecone() {
    const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string
  });
  return pinecone;
}
