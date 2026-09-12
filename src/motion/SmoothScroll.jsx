import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const scrollToTop = (lenis) => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenis?.scrollTo(0, { immediate: true, force: true });
};

const SmoothScroll = ({ children }) => {
    const { pathname, hash } = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        const lenis = new Lenis({
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 0.75,
            touchMultiplier: 0.75,
        });

        lenisRef.current = lenis;

        let animationFrameId;

        const raf = (time) => {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        };

        animationFrameId = requestAnimationFrame(raf);

        const stopScroll = () => lenis.stop();
        const startScroll = (event) => {
            lenis.start();
            const scrollY = event?.detail?.scrollY;
            if (typeof scrollY === "number") {
                lenis.scrollTo(scrollY, { immediate: true });
            }
        };
        const resetScroll = () => scrollToTop(lenis);
        window.addEventListener("lenis:stop", stopScroll);
        window.addEventListener("lenis:start", startScroll);
        window.addEventListener("lenis:scrollToTop", resetScroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("lenis:stop", stopScroll);
            window.removeEventListener("lenis:start", startScroll);
            window.removeEventListener("lenis:scrollToTop", resetScroll);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useLayoutEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView();
                lenisRef.current?.scrollTo(target, { immediate: true, force: true });
                return;
            }
        }

        scrollToTop(lenisRef.current);
    }, [pathname, hash]);

    return children;
};

export default SmoothScroll;
