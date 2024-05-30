export function getConnectWsEndpoint(userCapabilities) {
  const defaultCapabilities = {
    "tb:options": {
      key: "d76377d685004a00761a87a159355263",
      secret: "c233dd599b390d7d95c50b7ff9e3bdb4",
    },
  };
  const capabilities = { ...defaultCapabilities, ...userCapabilities };
  const connectUrl = `wss://cloud.testingbot.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;
  return connectUrl;
}
