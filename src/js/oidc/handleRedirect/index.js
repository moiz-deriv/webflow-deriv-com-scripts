import { fetchOIDCConfiguration } from "../fetchOIDCConfiguration";
import { getCookieByKey } from "../../footer/cookies";
function generateRandomString(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  const base64Url = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64Url;
}

async function redirectToAuthorizationEndpoint() {
  const user_language =
    getCookieByKey(document.cookie, "webflow-user-language")?.toLowerCase() ||
    "en";
  const server_url = localStorage.getItem("config.server_url");
  const clientId = window.getAppId() ?? "65738";
  const redirectUri = `${window.location.origin}/${user_language}/callback`;
  const responseType = "code";
  const scope = "openid";
  localStorage.setItem("post_auth_redirect", window.location.href);

  try {
    const codeVerifier = generateRandomString(32);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(32);

    localStorage.setItem("pkce_code_verifier", codeVerifier);
    localStorage.setItem("oauth_state", state);

    const oidcConfig = JSON.parse(
      localStorage.getItem("config.oidc_endpoints")
    );

    if (!oidcConfig || !oidcConfig.authorization_endpoint) {
      fetchOIDCConfiguration(server_url ? server_url : "oauth.deriv.com");
    }

    const authorizationUrl =
      `${oidcConfig.authorization_endpoint}?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=${encodeURIComponent(responseType)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${encodeURIComponent(state)}&` +
      `code_challenge=${encodeURIComponent(codeChallenge)}&` +
      `code_challenge_method=S256`;

    return authorizationUrl;
  } catch (error) {
    console.error("Error redirecting to authorization endpoint:", error);
  }
}
