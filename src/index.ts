// import type { VercelRequest, VercelResponse } from '@vercel/node';
// export default function handler(req: VercelRequest, res: VercelResponse) {
//   const { name = 'World' } = req.query;
//   return res.json({
//     message: `Hello ${name}!`,
//   });
// }

import express from 'express';
import type { Request, Response } from 'express';

const app = express();
// const port = process.env.PORT || 3000;
const port = 8080;

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
// biome-ignore lint/style/noDefaultExport: ignore
export default app;
