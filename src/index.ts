import express from 'express';
import type { Request, Response } from 'express';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req: Request, res: Response) => {
  res.send({ msg: 'Express Typescript on Vercel' });
});
app.get('/ping', (_req: Request, res: Response) => {
  res.send({ msg: 'pong' });
});
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
