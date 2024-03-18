import React, { PropsWithChildren, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
