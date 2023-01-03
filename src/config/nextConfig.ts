import getConfig from "next/config";

type GetConfig = {
  publicRuntimeConfig: { urlPrefix: string };
};

export default function nextConfig(): GetConfig {
  return getConfig();
}
