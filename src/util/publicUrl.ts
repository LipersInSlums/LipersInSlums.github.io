import nextConfig from "src/config/nextConfig";

export function url(path: string) {
  const { publicRuntimeConfig } = nextConfig();

  return publicRuntimeConfig.urlPrefix + path;
}
