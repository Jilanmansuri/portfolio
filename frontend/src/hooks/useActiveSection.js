import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useActiveSection = (sections) => {
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('');
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        // Initial check for hash
        if (location.hash) {
            const hashId = location.hash.replace('#', '');
            if (sections.includes(hashId)) {
                setActiveSection(hashId);
            }
        }

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) observer.unobserve(element);
            });
        };
    }, [location.pathname, location.hash, sections]);

    return activeSection;
};

export default useActiveSection;
