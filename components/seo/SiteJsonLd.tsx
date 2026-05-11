export function SiteJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const payload = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "가천대학교 경영대학원 에듀컨설팅 전공",
    url: base,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "가천대학교",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
