import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({ children, width = "100%", overflow = "hidden" }) => {
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
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
