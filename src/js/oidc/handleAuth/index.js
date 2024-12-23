import { getCookieByKey } from "../../footer/cookies";

function displayErrorState() {
  //Update to ui elements to show error
  document.getElementById("error").style.display = "block";
  document.getElementById("loading").style.display = "none";
}

async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  const storedState = localStorage.getItem("oauth_state");
  const codeVerifier = localStorage.getItem("pkce_code_verifier");

  if (!state || state !== storedState) {
    displayErrorState();
    return { error: "State validation failed" };
  }

  if (!code) {
    console.error("Authorization code is missing");
    displayErrorState();
    return { error: "Authorization code is missing" };
  }

  try {
    const oidcConfig = JSON.parse(
      localStorage.getItem("config.oidc_endpoints")
    );
    if (!oidcConfig || !oidcConfig.token_endpoint) {
      displayErrorState();
      throw new Error("Token endpoint not found in OIDC configuration.");
    }

    const tokenEndpoint = oidcConfig.token_endpoint;
    const user_language =
      getCookieByKey(document.cookie, "webflow-user-language")?.toLowerCase() ||
      "en";
    const payload = new URLSearchParams();
    payload.append("grant_type", "authorization_code");
    payload.append(
      "redirect_uri",
      `${window.location.origin}/${user_language}/callback`
    );
    payload.append("code", code);
    payload.append("code_verifier", codeVerifier);
    payload.append("client_id", window.getAppId() ?? "65738");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: payload,
    });

    if (!response.ok) {
      displayErrorState();
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const tokenData = await response.json();
    localStorage.setItem("id_token", tokenData.id_token);

    await fetchLegacyTokens(tokenData.access_token);
    return tokenData;
  } catch (error) {
    displayErrorState();
    console.error("Error during token exchange:", error);
  }
}

async function fetchLegacyTokens(accessToken) {
  const legacyTokenEndpoint = `https://oauth.deriv.com/oauth2/legacy/tokens`;

  try {
    const response = await fetch(legacyTokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      displayErrorState();
      throw new Error(`Fetching legacy tokens failed: ${response.status}`);
    }

    const legacyTokenData = await response.json();
    const token = JSON.stringify(legacyTokenData);
    if (token?.token1) {
      window
        .socketMessageSend(
          JSON.stringify({
            authorize: token?.token1,
          }),
          "authorize"
        )
        .then((response) => {
          const name = response.authorize.fullname.split(" ");
          const info = {
            email: response.authorize.email,
            currency: response.authorize.currency,
            landing_company_shortcode: response.authorize.landing_company_name,
            country: response.country,
            user_id: response.authorize.user_id,
            loginid: response.authorize.loginid,
            preferred_language: response.authorize.preferred_language,
            residence: response.authorize.country,
            first_name: name[0],
            last_name: name[1],
          };
          setCookie(
            "client_information",
            JSON.stringify(info),
            null,
            ".deriv.com"
          );
        });
    }

    localStorage.removeItem("pkce_code_verifier");
    localStorage.removeItem("oauth_state");
    document.cookie = "logged_state=true; path=/; Secure; domain=.deriv.com";
    window.location.href = localStorage.getItem("post_auth_redirect");
  } catch (error) {
    displayErrorState();
    console.error("Error fetching legacy tokens:", error);
  }
}
