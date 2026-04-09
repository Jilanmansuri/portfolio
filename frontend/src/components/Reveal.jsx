import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({ children, width = "100%", overflow = "hidden", direction = "up", delay = 0.25 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: { 
            opacity: 0, 
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? -60 : direction === "right" ? 60 : 0
        },
        visible: { opacity: 1, y: 0, x: 0 },
    };

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                width,
                overflow,
            }}
        >
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};
