export const siteBehaviourSecret = "694af2b2-9209-454a-a16a-b4f78b4fb86c";

type SiteBehaviourEnvironment = {
  nodeEnv?: string;
};

export function shouldEnableSiteBehaviour({
  nodeEnv,
}: SiteBehaviourEnvironment) {
  return nodeEnv === "production";
}

export function createSiteBehaviourBootstrap(secret: string) {
  return `
    if (window.location.search.includes("capture-sitebehaviour-heatmap")) {
      try {
        sessionStorage.setItem("capture-sitebehaviour-heatmap", "_");
      } catch (error) {
        console.warn("SiteBehaviour heatmap capture could not access session storage.", error);
      }
    }

    try {
      var siteBehaviourSecret = ${JSON.stringify(secret)};
      window.sitebehaviourTrackingSecret = siteBehaviourSecret;

      if (!document.getElementById("site-behaviour-script-v2")) {
        var siteBehaviourScript = document.createElement("script");
        siteBehaviourScript.defer = true;
        siteBehaviourScript.id = "site-behaviour-script-v2";
        siteBehaviourScript.src =
          "https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=" +
          siteBehaviourSecret;
        document.head.appendChild(siteBehaviourScript);
      }
    } catch (error) {
      console.error("SiteBehaviour could not initialize.", error);
    }
  `;
}
