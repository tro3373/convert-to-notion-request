import { markdownToRichText } from '@tryfabric/martian';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // const { name = 'World' } = req.query
  // return res.json({
  //   message: `Hello ${name}!`,
  // })
  const markdown = req.body || '**Hello _world_**';
  return res.json(markdownToRichText(markdown));
}
