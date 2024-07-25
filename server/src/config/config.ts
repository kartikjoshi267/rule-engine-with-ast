import dotenv from 'dotenv';
dotenv.config();

const throwExpression = () => {
  throw new Error('Environment variable not set');
}

export const MONGODB_URI = process.env.MONGODB_URI || throwExpression();

export const FRONTEND_URL = process.env.FRONTEND_URL || throwExpression();