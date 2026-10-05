type MediaRange = { type: string; subtype: string; q: number };

function parseAccept(accept: string): MediaRange[] {
  return accept.split(",").flatMap((part) => {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const [type, subtype] = range.trim().split("/");
    if (!type || !subtype) return [];

    const qParam = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
    const q = qParam ? Number(qParam.slice(2)) : 1;
    return [{ type, subtype, q: Number.isFinite(q) ? Math.min(Math.max(q, 0), 1) : 0 }];
  });
}

function htmlQuality(ranges: MediaRange[]): number {
  const exact = ranges.find((range) => range.type === "text" && range.subtype === "html");
  const textAny = ranges.find((range) => range.type === "text" && range.subtype === "*");
  const any = ranges.find((range) => range.type === "*" && range.subtype === "*");
  return (exact ?? textAny ?? any)?.q ?? 0;
}

/**
 * Markdown is served only when the client names text/markdown explicitly and
 * ranks it at least as high as HTML. Wildcards alone (a browser's * / *) get HTML.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;

  const ranges = parseAccept(accept);
  const markdown = ranges.find((range) => range.type === "text" && range.subtype === "markdown")?.q ?? 0;
  return markdown > 0 && markdown >= htmlQuality(ranges);
}
