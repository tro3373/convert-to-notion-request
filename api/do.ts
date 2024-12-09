import { markdownToBlocks } from '@tryfabric/martian';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const handler = (req: VercelRequest, res: VercelResponse) => {
  console.info('==> Handler started: req.body:', req.body);
  const body = req.body || {};
  let markdown = body.markdown || '**Hello _world_**';
  const html = body.html;
  console.info(`==> Converting ${html ? 'HTML' : 'Markdown'}..`);
  if (html) {
    const nhm = new NodeHtmlMarkdown(
      /* options (optional) */ {},
      /* customTransformers (optional) */ undefined,
      /* customCodeBlockTranslators (optional) */ undefined,
    );
    markdown = nhm.translate(html);
    console.info(`==> HTML2Markdown! ==> markdown: 
-- [Markdowned] -----------------------------------------------------------
${markdown}
---------------------------------------------------------------------------
`);
  }
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
