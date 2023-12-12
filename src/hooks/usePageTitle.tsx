import Head from "next/head";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useEffectOnce } from "react-use";

type PageTitleContext = {
  title: string;
  setTitle: (title: string | null | undefined) => void;
};

const pageTitleContext = createContext<PageTitleContext>({
  title: "",
  setTitle: () => void 0,
});

export default function usePageTitle(title?: string) {
  const context = useContext(pageTitleContext);

  useEffectOnce(() => {
    context.setTitle(title);
  });

  return context;
}

type Props = PropsWithChildren<{
  suffix: string;
  delimiter: string;
}>;

export function PageTitleProvider({ children, delimiter, suffix }: Props) {
  const [title, setTitle] = useState(suffix);

  const changeTitle = useCallback(
    (title: string | null | undefined) => {
      if (title == null) {
        setTitle(suffix);
      } else {
        setTitle(`${title} ${delimiter} ${suffix}`);
      }
    },
    [suffix, delimiter],
  );

  return (
    <pageTitleContext.Provider
      value={{
        setTitle: changeTitle,
        title,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </pageTitleContext.Provider>
  );
}
