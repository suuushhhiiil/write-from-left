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

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return children;
};

export default SmoothScroll;