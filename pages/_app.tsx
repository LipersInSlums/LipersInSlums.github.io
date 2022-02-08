import "../styles/globals.css";
import type { AppProps } from "next/app";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";
import { useEffect } from "react";

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
