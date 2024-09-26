document.addEventListener("DOMContentLoaded", function () {
  const updateLinkHrefs = () => {
    const featureFlagValue = Analytics?.Analytics?.getFeatureValue(
      "trigger_os_signup_wf"
    );
    const handleOutSystemsRedirection = () => {
      const currentDomain = window.location.hostname;
      let env;
      if (
        currentDomain === "deriv.com" ||
        currentDomain === "deriv.be" ||
        currentDomain === "deriv.me"
      ) {
        env = "production";
      } else if (currentDomain === "staging.deriv.com") {
        env = "staging";
      } else {
        env = "development";
      }
      switch (env) {
        case "production":
          return "https://hub.deriv.com/tradershub/signup";
        case "staging":
          return "https://staging-hub.deriv.com/tradershub/signup";
        default:
          return "https://dev-hub.deriv.com/tradershub/signup";
      }
    };

    function isSafari() {
      const ua = navigator.userAgent.toLowerCase();
      return /safari/.test(ua) && !/chrome/.test(ua) && !/crios/.test(ua);
    }

    function isIOS() {
      const ua = navigator.userAgent.toLowerCase();
      return /ipad|iphone|ipod/.test(ua);
    }

    const newHref = featureFlagValue
      ? isIOS() || isSafari()
        ? `https://${window.location.host}/signup`
        : handleOutSystemsRedirection()
      : `https://${window.location.host}/signup`;

    // Update href attributes
    const mainSignupButton = document.getElementById("cta-home-btn-navbar");
    if (mainSignupButton) {
      mainSignupButton.href = newHref;
    }

    const signupButtons = document.querySelectorAll(".logged-out-btn");
    signupButtons?.forEach((btn) => {
      if (btn?.href?.indexOf("/signup") > 0) {
        btn.href = newHref;
      }
    });

    const signupButtonsPlatforms =
      document.querySelectorAll(".logged-out-btn a");
    signupButtonsPlatforms?.forEach((btn) => {
      if (btn?.href?.indexOf("/signup") > 0) {
        btn.href = newHref;
      }
    });
  };

  Analytics?.Analytics?.getInstances()
    ?.ab?.GrowthBook?.loadFeatures()
    .then(() => {
      if (window.location.href.indexOf("/partners") > -1 === false) {
        updateLinkHrefs();
      }
    });
});
