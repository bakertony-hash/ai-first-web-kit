import { Shell } from "./components/Shell";
import { findRoute } from "./content/siteContent";
import { allJsonLd } from "./metadata/jsonLd";
import { NotFoundPage } from "./pages/NotFoundPage";
import { pageComponents } from "./pages/routeTable";

export default function App({ pathname }: { pathname: string }) {
  const route = findRoute(pathname);
  const Page = route ? pageComponents[route.path] : NotFoundPage;

  return (
    <>
      {allJsonLd().map((item) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          key={item["@type"]}
          type="application/ld+json"
        />
      ))}
      <Shell pathname={route?.path}>
        <Page />
      </Shell>
    </>
  );
}
