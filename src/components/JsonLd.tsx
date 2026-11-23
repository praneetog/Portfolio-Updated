import { portfolioData } from "@/data/portfolioData";
import { SITE_URL } from "@/lib/site";

/**
 * Server-rendered JSON-LD, entirely derived from portfolioData so there is
 * one source of truth. All values are our own static data (no user input),
 * so the injected script is safe.
 */
export function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  const knowsAbout = Array.from(
    new Set(portfolioData.techStack.flatMap((group) => group.tags)),
  );

  const sameAs = portfolioData.socials.map((s) => s.href);

  const education = portfolioData.experience.find(
    (e) =>
      e.title.toLowerCase().includes("b.tech") ||
      e.org.toLowerCase().includes("university"),
  );

  const description = `Portfolio of ${portfolioData.name}, a ${portfolioData.role} building scalable, AI-powered web products with Next.js, TypeScript, and Go.`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: portfolioData.name,
      url: SITE_URL,
      image: `${SITE_URL}${portfolioData.portrait}`,
      jobTitle: portfolioData.role,
      worksFor: {
        "@type": "Organization",
        name: portfolioData.meta.company,
      },
      ...(education
        ? {
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: education.org,
            },
          }
        : {}),
      sameAs,
      knowsAbout,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: `${portfolioData.name} — Portfolio`,
      url: SITE_URL,
      description,
      author: { "@id": personId },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // All content is our own trusted static data — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
