import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component for section animations
 * Uses IntersectionObserver for performance-optimized scroll reveals
 */
export default function ScrollReveal({ children, className = '', delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally unobserve after revealing once
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% visible
                rootMargin: '-50px' // Start animation slightly before element enters viewport
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
