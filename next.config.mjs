/** @type {import('next').NextConfig} */

/** `outputFileTracingIncludes`는 프로덕션 번들 추적에만 쓰입니다. dev에서 켜면 청크 404/MIME 오류가 날 수 있습니다. */
const prodFileTracing =
  process.env.NODE_ENV === "production"
    ? {
        experimental: {
          outputFileTracingIncludes: {
            "/faculty/[id]": ["./content/faculty-columns/**/*"],
            "/faculty/[id]/columns": ["./content/faculty-columns/**/*"],
            "/faculty/[id]/columns/[slug]": ["./content/faculty-columns/**/*"],
            "/admin/faculty-columns": ["./content/faculty-columns/**/*"],
          },
        },
      }
    : {};

const nextConfig = {
  reactStrictMode: true,
  ...prodFileTracing,
  async headers() {
    const security = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    if (process.env.VERCEL) {
      security.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }
    return [
      {
        // 보안 헤더는 HTML 라우트에만 (정적 청크·HMR에 적용 시 dev에서 MIME/404 이슈 가능)
        source: "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml).*)",
        headers: security,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev && process.platform === "win32") {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
