import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    // Optimization: Use MotionValue instead of useState to avoid re-renders on every mouse move
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth physics for the main cursor (tight spring)
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Laggy physics for the ring (loose spring)
    const ringConfig = { damping: 30, stiffness: 150, mass: 0.8 };
    const ringXSpring = useSpring(cursorX, ringConfig);
    const ringYSpring = useSpring(cursorY, ringConfig);

    // Ghost trail physics (heaviest lag)
    const ghostConfig = { damping: 40, stiffness: 100, mass: 1 };
    const ghostXSpring = useSpring(cursorX, ghostConfig);
    const ghostYSpring = useSpring(cursorY, ghostConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            // Update MotionValues directly - no React render cycle!
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(isTouch);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    if (isMobile) return null;

    return (
        <>
            {/* Main Cursor - Tech Diamond */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-sm pointer-events-none z-50 mix-blend-screen shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%", // Center optimization
                    translateY: "-50%",
                }}
                animate={{
                    rotate: isHovering ? 225 : 45,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }} // Only for rotate/scale, not x/y
            />

            {/* Trailing Ring - HUD / Focus Style */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white/40 border-dashed rounded-full pointer-events-none z-40 mix-blend-difference"
                style={{
                    x: ringXSpring,
                    y: ringYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    rotate: isHovering ? 180 : 0,
                }}
                transition={{ duration: 0.4 }}
            />

            {/* Outer Glow / Ghost - Subtle Lag */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-cyan-500/20 rounded-full pointer-events-none z-30 opacity-40"
                style={{
                    x: ghostXSpring,
                    y: ghostYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.5 }}
            />
        </>
    );
};
