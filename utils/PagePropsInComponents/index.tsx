import next from "next";
import type { AppProps } from "next/app";
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
const PagePropsContext = createContext(null);

const PagePropsProvider = ({
  children,
  value,
}: {
  children: ReactElement;
  value: AppProps;
}) => {
  return (
    <PagePropsContext.Provider  value={value}>
      {children}
    </PagePropsContext.Provider>
  );
};

export default PagePropsProvider;

const usePageProps = (): any => {
  const PageContext = useContext<any>(PagePropsContext);

  const [pageProps] = useState<any>(PageContext);
  console.log(pageProps);
  
  return pageProps;
};
export { usePageProps };
