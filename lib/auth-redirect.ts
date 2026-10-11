/**
 * Helper for persisting and constructing auth redirect URLs
 * Ensures redirects back to the caller host (e.g. localhost:2025 or custom domain)
 * are never lost across login, OTP, and account selection steps.
 */

export const getAuthRedirectParams = (
  searchParams?: URLSearchParams | null
): { host: string | null; path: string | null } => {
  let host = searchParams?.get("host");
  let path = searchParams?.get("path");

  if (typeof window !== "undefined") {
    if (host && host !== "null" && host !== "undefined") {
      sessionStorage.setItem("thrico_auth_host", host);
    } else {
      host = sessionStorage.getItem("thrico_auth_host");
    }

    if (path && path !== "null" && path !== "undefined") {
      sessionStorage.setItem("thrico_auth_path", path);
    } else {
      path = sessionStorage.getItem("thrico_auth_path");
    }
  }

  // Filter out literal "null" or "undefined" strings
  const cleanHost =
    host && host !== "null" && host !== "undefined" ? host : null;
  const cleanPath =
    path && path !== "null" && path !== "undefined" ? path : null;

  return { host: cleanHost, path: cleanPath };
};

/**
 * Builds the query string to pass along internal Next.js navigations (/login -> /otp -> /my-accounts)
 */
export const buildRedirectQueryString = (
  host: string | null,
  path: string | null,
  additionalParams?: Record<string, string | undefined | null>
): string => {
  const query = new URLSearchParams();

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        query.set(key, val);
      }
    });
  }

  if (host && host !== "null" && host !== "undefined") {
    query.set("host", host);
  }

  if (path && path !== "null" && path !== "undefined") {
    query.set("path", path);
  }

  const queryStr = query.toString();
  return queryStr ? `?${queryStr}` : "";
};

/**
 * Constructs the final auth callback URL (e.g. http://localhost:2025/auth/callback?code=...&path=...)
 */
export const buildAuthCallbackUrl = (
  token: string,
  host?: string | null,
  path?: string | null,
  extraParams?: Record<string, string>
): string => {
  const defaultDashboard =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://dashboard.thrico.com";
  const targetHost = (host || defaultDashboard).replace(/\/+$/, "");

  const callbackUrl = new URL(`${targetHost}/auth/callback`);
  callbackUrl.searchParams.set("code", token);

  if (path && path !== "null" && path !== "undefined") {
    let cleanPath = path;
    try {
      // If path is a full URL (e.g. http://localhost:2025// or http://localhost:2025/analytics)
      const parsed = new URL(path);
      cleanPath =
        (parsed.pathname + parsed.search + parsed.hash).replace(/^\/+/, "/") ||
        "/";
    } catch {
      // If path is a relative path (e.g. // or /analytics)
      if (cleanPath.startsWith("/")) {
        cleanPath = cleanPath.replace(/^\/+/, "/") || "/";
      }
    }
    callbackUrl.searchParams.set("path", cleanPath);
  }

  if (extraParams) {
    Object.entries(extraParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        callbackUrl.searchParams.set(key, val);
      }
    });
  }

  // Clear session storage once redirect target is built
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("thrico_auth_host");
    sessionStorage.removeItem("thrico_auth_path");
  }

  return callbackUrl.toString();
};
