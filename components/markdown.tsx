import React from "react";

// Minimal, safe Markdown renderer (no HTML injection). Handles headings, lists,
// blockquotes, and paragraphs with **bold** / *italic* inline emphasis.
function inline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyBase}-b-${i}`}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${keyBase}-i-${i}`}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      const items = [...list];
      blocks.push(
        <ul key={`ul-${key++}`} className="my-4 list-disc space-y-1 pl-6 text-slate-700">
          {items.map((it, idx) => (
            <li key={idx}>{inline(it, `li-${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }
    flushList();
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key++} className="mt-6 font-display text-lg font-semibold text-slate-900">{inline(line.slice(4), `h3-${key}`)}</h3>);
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++} className="mt-8 font-display text-xl font-bold text-slate-900">{inline(line.slice(3), `h2-${key}`)}</h2>);
    } else if (line.startsWith("# ")) {
      blocks.push(<h1 key={key++} className="mt-2 font-display text-2xl font-bold text-slate-900">{inline(line.slice(2), `h1-${key}`)}</h1>);
    } else if (line.startsWith("> ")) {
      blocks.push(<blockquote key={key++} className="my-4 border-l-4 border-brand-200 pl-4 italic text-slate-600">{inline(line.slice(2), `bq-${key}`)}</blockquote>);
    } else if (line === "---") {
      blocks.push(<hr key={key++} className="my-6 border-slate-200" />);
    } else {
      blocks.push(<p key={key++} className="my-3 leading-relaxed text-slate-700">{inline(line, `p-${key}`)}</p>);
    }
  }
  flushList();

  return <div>{blocks}</div>;
}
