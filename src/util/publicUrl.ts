import getConfig from "next/config";

export function url(path: string) {
  console.log(getConfig());
  const { publicRuntimeConfig } = getConfig() as {
    publicRuntimeConfig: { urlPrefix: string };
  };

  return publicRuntimeConfig.urlPrefix + path;
}
