import type { Source } from "../content/siteContent";

export function SourceLinks({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <p className="source-links">
      Sources:{" "}
      {sources.map((source, index) => (
        <span key={source.url}>
          {index > 0 && "; "}
          <a href={source.url}>{source.label}</a>
        </span>
      ))}
    </p>
  );
}
