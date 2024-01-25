import express, { Express } from 'express';
import path from 'node:path';
import mongoose from 'mongoose';
import { router } from './router';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app: Express = express();
    const PORT = 3001;

    app.use((req,res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('Error connecting to mongodb', { error }));
