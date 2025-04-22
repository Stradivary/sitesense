import createMiddleware from "next-intl/middleware";
import { routing } from "./presentation/utils/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(id|en)/:path*"],
};
