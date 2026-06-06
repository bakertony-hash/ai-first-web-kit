const baseUrl = process.env.AGENT_READABILITY_BASE_URL ?? "https://ai-first-web-kit.vercel.app";
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const targets = [
  {
    path: "/llms.txt",
    expectedContentType: "text/plain;charset=UTF-8"
  },
  {
    path: "/ai-site-manifest.json",
    expectedContentType: "application/json;charset=UTF-8"
  },
  {
    path: "/robots.txt",
    expectedContentType: "text/plain;charset=UTF-8"
  },
  {
    path: "/sitemap.xml",
    expectedContentType: "application/xml;charset=UTF-8"
  }
];

const disallowedRobotsDirectives = ["noindex", "noai", "noimageai"];

function normalizeHeader(value) {
  return value ? value.replace(/\s+/g, "").toLowerCase() : "";
}

function expectedHeader(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

async function verifyTarget(target) {
  const url = new URL(target.path, baseUrl);
  const headers = {};

  if (bypassSecret) {
    headers["x-vercel-protection-bypass"] = bypassSecret;
  }

  const response = await fetch(url, { headers, method: "GET" });
  const contentType = response.headers.get("content-type");
  const robotsTag = response.headers.get("x-robots-tag") ?? "";

  if (!response.ok) {
    throw new Error(`${target.path} returned HTTP ${response.status}`);
  }

  if (normalizeHeader(contentType) !== expectedHeader(target.expectedContentType)) {
    throw new Error(`${target.path} returned content-type ${contentType}, expected ${target.expectedContentType}`);
  }

  const robotsValue = robotsTag.toLowerCase();
  for (const directive of disallowedRobotsDirectives) {
    if (robotsValue.includes(directive)) {
      throw new Error(`${target.path} returned disallowed x-robots-tag directive ${directive}`);
    }
  }

  return {
    path: target.path,
    status: response.status,
    contentType,
    robotsTag: robotsTag || "(none)"
  };
}

const results = [];

for (const target of targets) {
  results.push(await verifyTarget(target));
}

console.table(results);
console.log(
  bypassSecret
    ? "Used x-vercel-protection-bypass from VERCEL_AUTOMATION_BYPASS_SECRET."
    : "No VERCEL_AUTOMATION_BYPASS_SECRET was set; requests were sent without the bypass header."
);
