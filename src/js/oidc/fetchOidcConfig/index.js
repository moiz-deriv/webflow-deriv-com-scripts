async function fetchOIDCConfiguration() {
  const server_url = localStorage.getItem("config.server_url");

  const url = `https://${
    server_url ? server_url : "oauth.deriv.com"
  }/.well-known/openid-configuration`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("config.oidc_endpoints", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching OIDC configuration:", error);
    return { error: error.message };
  }
}

return fetchOIDCConfiguration();
