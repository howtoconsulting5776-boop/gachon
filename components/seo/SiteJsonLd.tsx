import { getPublicSiteRoot } from "@/lib/site-url";

export function SiteJsonLd() {
  const base = getPublicSiteRoot();
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${base}/#organization`,
        name: "가천대학교 경영대학원 에듀컨설팅 전공",
        url: base,
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "가천대학교",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "가천대학교 경영대학원 에듀컨설팅 전공",
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "ko-KR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
