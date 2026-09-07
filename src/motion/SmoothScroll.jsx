import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 0.75,
            touchMultiplier: 0.75,
        });

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
            if (typeof scrollY === 'number') {
                lenis.scrollTo(scrollY, { immediate: true });
            }
        };
        window.addEventListener('lenis:stop', stopScroll);
        window.addEventListener('lenis:start', startScroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('lenis:stop', stopScroll);
            window.removeEventListener('lenis:start', startScroll);
            lenis.destroy();
        };
    }, []);

    return children;
};

export default SmoothScroll;