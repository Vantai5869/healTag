import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, internal Next.js routes, and static files
  // - Only process routes for supported locales (en, vi)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
