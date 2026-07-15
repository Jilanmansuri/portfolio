import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Code2, Flame, Trophy, GitCommit, Calendar, Activity } from 'lucide-react';
import './CodingActivity.css';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

                // Ease out expo
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                setCount(Math.floor(easeOut * value));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    setCount(value);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// Simulated Heatmap Component
const SimulatedHeatmap = ({ type, data = [] }) => {
    // Generate a grid of squares (26 weeks, 5 days per week visible for compactness)
    const cols = 26;
    const rows = 5;
    const totalSquares = cols * rows;

    const colors = type === 'github'
        ? ['rgba(255,255,255,0.05)', '#0e4429', '#006d32', '#26a641', '#39d353']
        : ['rgba(255,255,255,0.05)', 'rgba(249, 115, 22, 0.25)', 'rgba(249, 115, 22, 0.5)', 'rgba(249, 115, 22, 0.75)', 'rgba(249, 115, 22, 1.0)'];

    const useRealData = (type === 'github' || type === 'leetcode') && data && data.length > 0;
    
    // Get local today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const realDataSlice = useRealData 
        ? [...data]
            .filter(item => item.date <= todayStr)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(-totalSquares) 
        : [];

    const squares = Array.from({ length: totalSquares }).map((_, i) => {
        let colorIndex = 0;
        let titleText = "";

        if (useRealData && realDataSlice[i]) {
            const item = realDataSlice[i];
            colorIndex = Math.min(item.level, 4);
            titleText = `${item.count} contributions on ${item.date}`;
        } else {
            // Create an organic looking pattern as fallback
            const randomFactor = Math.sin(i * 0.5) * Math.cos(i * 0.1) + Math.random();
            if (randomFactor > 1.4) colorIndex = 4;
            else if (randomFactor > 1.0) colorIndex = 3;
            else if (randomFactor > 0.7) colorIndex = 2;
            else if (randomFactor > 0.4) colorIndex = 1;
            titleText = `Activity Level: ${colorIndex}`;
        }

        return (
            <div
                key={i}
                className="ca-square"
                style={{ backgroundColor: colors[colorIndex] }}
                title={titleText}
            ></div>
        );
    });

    return (
        <div className="ca-graph-container">
            <h4 className="ca-graph-title">Activity Heatmap</h4>
            <div className="ca-grid">
                {squares}
            </div>
        </div>
    );
};

const CodingActivity = () => {
    const [githubData, setGithubData] = useState({
        contributions: 1369,
        repos: 41,
        contributionsList: []
    });

    const [leetcodeData, setLeetcodeData] = useState({
        solved: 175,
        active: 82,
        streak: 15,
        contributionsList: []
    });

    useEffect(() => {
        const fetchLeetcodeData = async () => {
            try {
                const [solvedRes, calendarRes] = await Promise.all([
                    fetch('https://alfa-leetcode-api.onrender.com/Jilan2410/solved'),
                    fetch('https://alfa-leetcode-api.onrender.com/Jilan2410/calendar')
                ]);
                const solvedData = await solvedRes.json();
                const calendarData = await calendarRes.json();

                if (solvedData && calendarData) {
                    const cal = JSON.parse(calendarData.submissionCalendar || '{}');
                    const calMap = {};
                    Object.entries(cal).forEach(([timestamp, count]) => {
                        const date = new Date(parseInt(timestamp) * 1000);
                        const dateStr = date.toISOString().split('T')[0];
                        calMap[dateStr] = (calMap[dateStr] || 0) + count;
                    });

                    const contributions = [];
                    const today = new Date();
                    for (let i = 130; i >= 0; i--) {
                        const d = new Date(today);
                        d.setDate(today.getDate() - i);
                        const dateStr = d.toISOString().split('T')[0];
                        const count = calMap[dateStr] || 0;
                        let level = 0;
                        if (count > 0) {
                            if (count >= 10) level = 4;
                            else if (count >= 5) level = 3;
                            else if (count >= 3) level = 2;
                            else level = 1;
                        }
                        contributions.push({
                            date: dateStr,
                            count,
                            level
                        });
                    }

                    setLeetcodeData({
                        solved: solvedData.solvedProblem || 175,
                        active: calendarData.totalActiveDays || 82,
                        streak: calendarData.streak || 15,
                        contributionsList: contributions
                    });
                }
            } catch (error) {
                console.error("Error fetching LeetCode data:", error);
            }
        };

        fetchLeetcodeData();
    }, []);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Fetch public profile info
                const profileRes = await fetch('https://api.github.com/users/Jilanmansuri');
                const profileData = await profileRes.json();

                // Fetch contributions history
                const contribRes = await fetch('https://github-contributions-api.jogruber.de/v4/Jilanmansuri');
                const contribData = await contribRes.json();

                if (profileData && contribData) {
                    const totalContribs = Object.values(contribData.total || {}).reduce((sum, val) => sum + val, 0);
                    setGithubData({
                        contributions: totalContribs || 1369,
                        repos: profileData.public_repos || 41,
                        contributionsList: contribData.contributions || []
                    });
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            }
        };

        fetchGithubData();
    }, []);

    return (
        <section className="coding-activity-section" id="coding-activity">
            <motion.h2
                initial={{ opacity: 0, x: -50, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                Coding Activity
            </motion.h2>

            <div className="ca-container">
                {/* Github Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="ca-card github"
                >
                    <div className="ca-header">
                        <div className="ca-icon-wrapper">
                            <Github size={32} />
                        </div>
                        <h3>GitHub</h3>
                    </div>

                    <div className="ca-stats-grid">
                        <div className="ca-stat-item">
                            <span className="ca-stat-value"><AnimatedCounter value={githubData.contributions} suffix="+" /></span>
                            <span className="ca-stat-label"><GitCommit size={14} className="inline mr-1" /> Contributions</span>
                        </div>
                        <div className="ca-stat-item">
                            <span className="ca-stat-value"><AnimatedCounter value={githubData.repos} /></span>
                            <span className="ca-stat-label">Repositories</span>
                        </div>
                    </div>

                    <SimulatedHeatmap type="github" data={githubData.contributionsList} />

                    <a href="https://github.com/Jilanmansuri" target="_blank" rel="noopener noreferrer" className="ca-link">
                        View GitHub Profile <ExternalLink size={18} />
                    </a>
                </motion.div>

                {/* LeetCode Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="ca-card leetcode"
                >
                    <div className="ca-header">
                        <div className="ca-icon-wrapper">
                            <Code2 size={32} />
                        </div>
                        <h3>LeetCode</h3>
                    </div>

                    <div className="ca-stats-grid">
                        <div className="ca-stat-item">
                            <span className="ca-stat-value"><AnimatedCounter value={leetcodeData.solved} /></span>
                            <span className="ca-stat-label"><Code2 size={14} className="inline mr-1 text-orange-400" /> Solved</span>
                        </div>
                        <div className="ca-stat-item">
                            <span className="ca-stat-value"><AnimatedCounter value={leetcodeData.active} /></span>
                            <span className="ca-stat-label"><Calendar size={14} className="inline mr-1 text-orange-400" /> Active</span>
                        </div>
                        <div className="ca-stat-item">
                            <span className="ca-stat-value"><AnimatedCounter value={leetcodeData.streak} /></span>
                            <span className="ca-stat-label"><Flame size={14} className="inline mr-1 text-orange-500" /> Streak</span>
                        </div>
                    </div>

                    <SimulatedHeatmap type="leetcode" data={leetcodeData.contributionsList} />

                    <a href="https://leetcode.com/u/Jilan2410/" target="_blank" rel="noopener noreferrer" className="ca-link">
                        View LeetCode Profile <ExternalLink size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default CodingActivity;
