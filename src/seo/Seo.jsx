import { useEffect } from "react";

// util: cria/atualiza <meta> pelo "name" OU "property"
function upsertMeta({ name, property, content }) {
  if (!content) return;
  const selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink({ rel, href }) {
  if (!href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  canonical,
  image, // URL absoluta da OG/Twitter image
  type = "website", // og:type
  siteName = "Siingulo",
  locale = "pt_BR",
  twitterCard = "summary_large_image",
  noindex = false,
  jsonLd, // objeto JS para <script type="application/ld+json">
}) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    // meta básicos
    upsertMeta({ name: "description", content: description });
    upsertMeta({
      name: "robots",
      content: noindex ? "noindex,nofollow" : "index,follow",
    });

    // canonical
    upsertLink({ rel: "canonical", href: canonical });

    // Open Graph
    upsertMeta({ property: "og:type", content: type });
    upsertMeta({ property: "og:site_name", content: siteName });
    upsertMeta({ property: "og:title", content: title });
    upsertMeta({ property: "og:description", content: description });
    upsertMeta({ property: "og:url", content: canonical });
    upsertMeta({ property: "og:image", content: image });
    upsertMeta({ property: "og:locale", content: locale });

    // Twitter
    upsertMeta({ name: "twitter:card", content: twitterCard });
    upsertMeta({ name: "twitter:title", content: title });
    upsertMeta({ name: "twitter:description", content: description });
    upsertMeta({ name: "twitter:image", content: image });

    // JSON-LD (schema.org)
    let ldScript;
    if (jsonLd) {
      ldScript = document.head.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.type = "application/ld+json";
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      if (title) document.title = prevTitle;
      if (jsonLd && ldScript) {
        document.head.removeChild(ldScript);
      }
    };
  }, [
    title,
    description,
    canonical,
    image,
    type,
    siteName,
    locale,
    twitterCard,
    noindex,
    jsonLd,
  ]);

  return null;
}
