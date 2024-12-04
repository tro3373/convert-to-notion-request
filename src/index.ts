import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req: Request, res: Response) => {
  res.send({ msg: 'Express Typescript on Vercel' });
});
app.get('/ping', (_req: Request, res: Response) => {
  res.send({ msg: 'pong' });
});
if (process.env.START_LISTEN === '1') {
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}
// biome-ignore lint/style/noDefaultExport: ignore
export default app;
