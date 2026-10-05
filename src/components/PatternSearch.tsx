import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { searchPatterns } from "../content/searchPatterns";
import { webmcpTools } from "../content/siteContent";

const tool = webmcpTools.searchPatterns;
const [queryParam] = tool.params;

export function PatternSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(queryParam.name)?.trim() ?? "";
    if (inputRef.current) inputRef.current.value = fromUrl;
    setQuery(fromUrl);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitted = String(new FormData(event.currentTarget).get(queryParam.name) ?? "").trim();
    setQuery(submitted);
    window.history.replaceState(null, "", submitted ? `?${queryParam.name}=${encodeURIComponent(submitted)}` : window.location.pathname);

    const nativeEvent = event.nativeEvent as SubmitEvent;
    if (nativeEvent.agentInvoked && nativeEvent.respondWith) {
      nativeEvent.respondWith(Promise.resolve(JSON.stringify({ query: submitted, results: searchPatterns(submitted) })));
    }
  }

  const results = searchPatterns(query);

  return (
    <section className="section tool-panel" aria-labelledby="pattern-search-heading">
      <h2 id="pattern-search-heading">Search the patterns</h2>
      <form
        action="/patterns"
        method="get"
        onSubmit={handleSubmit}
        role="search"
        toolautosubmit=""
        tooldescription={tool.description}
        toolname={tool.name}
      >
        <label htmlFor="pattern-search-q">{queryParam.label}</label>
        <div className="form-row">
          <input
            id="pattern-search-q"
            name={queryParam.name}
            ref={inputRef}
            required
            toolparamdescription={queryParam.description}
            type="search"
          />
          <button className="button button-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      <div aria-live="polite" className="search-results">
        {query && (
          <>
            <p>
              {results.length === 0
                ? `No patterns match "${query}".`
                : `${results.length} ${results.length === 1 ? "pattern matches" : "patterns match"} "${query}":`}
            </p>
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <a href={`#${result.id}`}>{result.title}</a> ({result.layer})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
