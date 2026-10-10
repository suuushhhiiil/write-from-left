import { createContext, useContext, useLayoutEffect } from "react";

export const RouteReadyContext = createContext(true);
export const RouteHoldContext = createContext(null);

export function useRouteImagesReady() {
  return useContext(RouteReadyContext);
}

export function useHoldRouteLoader(holding) {
  const retain = useContext(RouteHoldContext);

  useLayoutEffect(() => {
    if (!retain || !holding) return undefined;
    return retain();
  }, [retain, holding]);
}
