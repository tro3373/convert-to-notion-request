import { markdownToBlocks } from '@tryfabric/martian';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const handler = (req: VercelRequest, res: VercelResponse) => {
  console.info('==> Handler started: req.body:', req.body);
  const body = req.body || {};
  const html = body.html || '<h1>Hello world</h1>';
  console.info(`==> Converting ${html ? 'HTML' : 'Markdown'}..`);
  const nhm = new NodeHtmlMarkdown(
    /* options (optional) */ {},
    /* customTransformers (optional) */ undefined,
    /* customCodeBlockTranslators (optional) */ undefined,
  );
  const markdown = nhm.translate(html);
  console.info(`==> HTML2Markdown! ==> markdown: 
-- [Markdowned] -----------------------------------------------------------
${markdown}
---------------------------------------------------------------------------
`);
  const option = {
    notionLimits: {
      truncate: false,
    },
  };
  // const notionBlocks = markdownToRichText(markdown, option);
  const notionBlocks = markdownToBlocks(markdown, option);
  console.info(`==> MarkdownToNotionBlocks! ==> notionBlocks:
-- [notionBlocks Json] ----------------------------------------------------------
${JSON.stringify(notionBlocks, null, 2)}
---------------------------------------------------------------------------
`);
  return res.json({
    html,
    markdown,
    notionBlocks,
  });
};
// biome-ignore lint/style/noDefaultExport: ignore
export default handler;
