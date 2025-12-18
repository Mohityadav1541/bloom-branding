import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
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
            // Check if device is touch-primary (mobile/tablet)
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
    }, []);

    if (isMobile) return null;

    return (
        <>
            {/* Main Cursor - Tech Diamond */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-sm pointer-events-none z-50 mix-blend-screen shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    rotate: isHovering ? 225 : 45, // Spin interaction
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5,
                }}
            />
            {/* Trailing Ring - HUD / Focus Style */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white/40 border-dashed rounded-full pointer-events-none z-40 mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 2 : 1,
                    rotate: isHovering ? 180 : 0, // Rotate based on hover state
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    mass: 0.8,
                }}
            />
            {/* Outer Glow / Ghost - Subtle Lag */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-cyan-500/20 rounded-full pointer-events-none z-30 opacity-40"
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 40,
                    mass: 1, // Heaviest lag
                }}
            />
        </>
    );
};
