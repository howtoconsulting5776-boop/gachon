import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const path = req.nextUrl.pathname;
      if (path === "/admin/login" || path.startsWith("/admin/login/")) {
        return true;
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
