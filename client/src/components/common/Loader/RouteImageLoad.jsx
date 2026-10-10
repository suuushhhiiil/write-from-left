import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader.jsx";
import { RouteHoldContext, RouteReadyContext } from "./routeImageLoadContext.js";

const SAFETY_MS = 10000;
const FALLBACK_SWAP_MS = 50;

const isLoaded = (img) => img.complete && img.naturalWidth > 0;

const percentFor = (loaded, total) =>
  total === 0 ? 0 : Math.round((loaded / total) * 100);

export function RouteImageLoadProvider({ children }) {
  const { pathname } = useLocation();
  const containerRef = useRef(null);
  const holdsRef = useRef(0);
  const readyRef = useRef(false);
  const countsRef = useRef({ loaded: 0, total: 0 });
  const evaluateRef = useRef(() => {});
  const [routePath, setRoutePath] = useState(pathname);
  const [progress, setProgress] = useState({ loaded: 0, total: 0, percent: 0 });
  const [ready, setReady] = useState(false);

  if (routePath !== pathname) {
    setRoutePath(pathname);
    setReady(false);
    setProgress({ loaded: 0, total: 0, percent: 0 });
  }

  const retain = useCallback(() => {
    holdsRef.current += 1;
    return () => {
      holdsRef.current = Math.max(0, holdsRef.current - 1);
      evaluateRef.current();
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let openFrame = 0;
    const tracked = new Map();
    readyRef.current = false;
    countsRef.current = { loaded: 0, total: 0 };

    let listObserver = null;

    const publish = () => {
      if (cancelled) return;
      const { loaded, total } = countsRef.current;
      setProgress({ loaded, total, percent: percentFor(loaded, total) });
    };

    const markReady = () => {
      if (cancelled || readyRef.current) return;
      readyRef.current = true;
      listObserver?.disconnect();
      setReady(true);
    };

    const tryOpen = () => {
      if (cancelled || readyRef.current) return;
      cancelAnimationFrame(openFrame);
      openFrame = requestAnimationFrame(() => {
        if (cancelled || readyRef.current) return;
        scan();
        if (holdsRef.current > 0) return;
        if (countsRef.current.loaded < countsRef.current.total) return;
        markReady();
      });
    };

    evaluateRef.current = tryOpen;

    const settle = (entry) => {
      if (cancelled || entry.settled) return;
      entry.settled = true;
      entry.cleanup?.();
      entry.cleanup = null;
      countsRef.current.loaded += 1;
      publish();
      if (
        holdsRef.current === 0 &&
        countsRef.current.loaded >= countsRef.current.total
      ) {
        tryOpen();
      }
    };

    const watch = (img) => {
      if (cancelled || tracked.has(img)) return;

      const entry = { settled: false, cleanup: null };
      tracked.set(img, entry);
      countsRef.current.total += 1;

      if (img.loading !== "eager") {
        img.loading = "eager";
      }

      const arm = () => {
        const detach = () => {
          img.removeEventListener("load", onLoad);
          img.removeEventListener("error", onError);
        };
        const onLoad = () => {
          detach();
          settle(entry);
        };
        const onError = () => {
          detach();
          waitForSrcSwap(img.src);
        };

        entry.cleanup?.();
        entry.cleanup = detach;
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);

        if (isLoaded(img)) {
          detach();
          settle(entry);
        }
      };

      const waitForSrcSwap = (srcAtError) => {
        if (entry.settled || cancelled) return;
        entry.cleanup?.();

        let timer = 0;
        const observer = new MutationObserver(() => {
          if (img.src === srcAtError) return;
          finish();
        });

        const finish = () => {
          observer.disconnect();
          window.clearTimeout(timer);
          if (entry.settled || cancelled) return;
          if (img.src !== srcAtError) {
            if (isLoaded(img)) settle(entry);
            else arm();
            return;
          }
          settle(entry);
        };

        observer.observe(img, { attributes: true, attributeFilter: ["src"] });
        timer = window.setTimeout(finish, FALLBACK_SWAP_MS);
        entry.cleanup = () => {
          observer.disconnect();
          window.clearTimeout(timer);
        };
      };

      if (isLoaded(img)) {
        settle(entry);
        return;
      }

      arm();

      if (img.complete) {
        waitForSrcSwap(img.src);
      }
    };

    const scan = () => {
      if (cancelled || readyRef.current) return;
      container.querySelectorAll("img").forEach((img) => watch(img));
      publish();
      if (
        holdsRef.current === 0 &&
        countsRef.current.loaded >= countsRef.current.total
      ) {
        tryOpen();
      }
    };

    listObserver = new MutationObserver(() => {
      scan();
    });
    listObserver.observe(container, { childList: true, subtree: true });
    scan();

    const timeout = window.setTimeout(markReady, SAFETY_MS);

    return () => {
      cancelled = true;
      evaluateRef.current = () => {};
      cancelAnimationFrame(openFrame);
      window.clearTimeout(timeout);
      listObserver?.disconnect();
      tracked.forEach((entry) => entry.cleanup?.());
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (ready) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [ready]);

  useEffect(() => {
    if (ready) return undefined;

    const frame = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("lenis:stop"));
    });

    return () => {
      cancelAnimationFrame(frame);
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [ready]);

  return (
    <RouteReadyContext.Provider value={ready}>
      <RouteHoldContext.Provider value={retain}>
        <div ref={containerRef}>{children}</div>
        {!ready && <Loader progress={progress} />}
      </RouteHoldContext.Provider>
    </RouteReadyContext.Provider>
  );
}
