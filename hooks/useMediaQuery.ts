import { useEffect, useState } from "react";

export function useMediaQuery(mediaQuery: string) {
  const parsedQuery =
    (mediaQuery.match(/(\([\w\s-:]+\))/) || [])[1] || mediaQuery;
  const mediaQueryList = window.matchMedia(parsedQuery);
  const [value, setValue] = useState(mediaQueryList.matches);

  useEffect(() => {
    const mediaQueryListener = () => setValue(mediaQueryList.matches);

    mediaQueryList.addListener(mediaQueryListener);
    return () => mediaQueryList.removeListener(mediaQueryListener);
  }, [mediaQueryList]);

  return value;
}
