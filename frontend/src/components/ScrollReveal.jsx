import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function ScrollReveal({ children, width = "100%", overflow = "hidden", direction = "up" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: { 
            opacity: 0, 
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0
        },
        visible: { opacity: 1, y: 0, x: 0 },
    };

    return (
        <div
            ref={ref}
            style={{ position: "relative", width, overflow }}
        >
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
