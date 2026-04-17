import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Hackathons from '../components/Hackathons';

const HackathonsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '60px' }}>
            <SEO 
                title="Hackathons & Achievements | Jilan Mansuri" 
                description="Explore my competitive hackathon participation, innovative prototypes built under pressure, and technical achievements at IISc Bangalore and beyond." 
            />
            <Hackathons />
        </div>
    );
};

export default HackathonsPage;
