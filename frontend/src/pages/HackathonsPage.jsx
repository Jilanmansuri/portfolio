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
                title="Hackathons | Jilan Mansuri" 
                description="View my competitive hackathon projects, achievements, certificates, and innovative tech solutions." 
            />
            <Hackathons />
        </div>
    );
};

export default HackathonsPage;
