import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    if (match[1] && match[2]) nodes.push(<a key={index++} href={match[2]} className="font-medium text-brand-ink underline">{match[1]}</a>);
    else if (match[3]) nodes.push(<strong key={index++}>{match[3]}</strong>);
    else if (match[4]) nodes.push(<em key={index++}>{match[4]}</em>);
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return (
    <div className="space-y-4 text-base leading-relaxed text-ink">
      {blocks.map((block, key) => (
        <p key={key}>{inline(block.replace(/\n/g, " "))}</p>
      ))}
    </div>
  );
}
