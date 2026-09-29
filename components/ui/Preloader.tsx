"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check if preloader has already been shown in this browser session
        const hasSeenPreloader = sessionStorage.getItem("rr_preloader_seen");

        if (hasSeenPreloader) {
            setIsLoading(false);
            return;
        }

        // Lock body scroll while preloader is active
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("rr_preloader_seen", "true");
            document.body.style.overflow = "";
        }, 2200);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F6F5F2] px-6 select-none"
                >
                    {/* Subtle Ambient Background Gradient */}
                    <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_50%,rgba(215,205,185,0.3),transparent_70%)]" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Main Brand Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.14em] text-[#1c1c1c] uppercase font-normal"
                        >
                            Refine &amp; Rare
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                            className="mt-3 md:mt-4 text-xs sm:text-sm tracking-[0.35em] text-[#6b655a] uppercase font-medium"
                        >
                            Bespoke Interiors
                        </motion.p>

                        {/* Thin Centered Horizontal Divider Line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "80px", opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                            className="my-5 h-[1px] bg-[#d5cfc4]"
                        />

                        {/* Italic Serif Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
                            className="font-serif italic text-sm sm:text-base text-[#7c7569] font-normal tracking-wide"
                        >
                            For Homes &amp; Living Spaces
                        </motion.p>
                    </div>

                    {/* Minimalist Bottom Progress Indicator Line */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1.5px] bg-[#e4dfd5] overflow-hidden rounded-full">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="w-full h-full bg-[#1c1c1c]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
