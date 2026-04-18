import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';

const Certificates = () => {
    return (
        <section className="section" id="certificates">
            <motion.h2
                initial={{ opacity: 0, x: -50, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                Certifications
            </motion.h2>

            <div className="certificates-list">

                {/* Cert 1 */}



                <div className="cert-col">
                    <Reveal direction="left">
                        <div className="cert-card-large shadow-xl flex flex-col w-full h-full">
                            <div className="cert-image-wrapper h-[180px] md:h-[200px] bg-black/40 flex items-center justify-center p-2 pb-1">
                                <img
                                    src="/cert-js.png"
                                    alt="JavaScript (Basic) Certificate"
                                    className="cert-img-large object-contain max-h-full"
                                />
                            </div>
                            <div className="cert-details-large flex flex-col">
                                <div className="cert-row flex flex-col items-start w-full">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <div className="cert-header flex items-center gap-2 font-bold text-white">
                                            <Award size={14} className="text-[#38bdf8] shrink-0" />
                                            <h3 className="text-[13px] leading-tight truncate">JavaScript (Basic)</h3>
                                        </div>
                                        <div className="pl-[20px]">
                                            <p className="cert-issuer text-[9px] font-medium text-gray-400 uppercase tracking-wider">HackerRank • Dec 2025</p>
                                        </div>
                                    </div>
                                    <a href="https://www.hackerrank.com/certificates/c85612d20bee" target="_blank" rel="noopener noreferrer" className="btn-link cert-verify-btn">Verify <ExternalLink size={14} /></a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Cert 2 */}
                <div className="cert-col">
                    <Reveal direction="right" delay={0.4}>
                        <div className="cert-card-large shadow-xl flex flex-col w-full h-full">
                            <div className="cert-image-wrapper h-[180px] md:h-[200px] bg-black/40 flex items-center justify-center p-2 pb-1">
                                <img
                                    src="/cert-css.png"
                                    alt="HackerRank CSS Certificate"
                                    className="cert-img-large object-contain max-h-full"
                                />
                            </div>
                            <div className="cert-details-large flex flex-col">
                                <div className="cert-row flex flex-col items-start w-full">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <div className="cert-header flex items-center gap-2 font-bold text-white">
                                            <Award size={14} className="text-[#f97316] shrink-0" />
                                            <h3 className="text-[13px] leading-tight truncate">CSS</h3>
                                        </div>
                                        <div className="pl-[20px]">
                                            <p className="cert-issuer text-[9px] font-medium text-gray-400 uppercase tracking-wider">HackerRank • Dec 2025</p>
                                        </div>
                                    </div>
                                    <a href="https://www.hackerrank.com/certificates/c6d54d0abd5f" target="_blank" rel="noopener noreferrer" className="btn-link cert-verify-btn">Verify <ExternalLink size={14} /></a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Cert 3 — centered below */}
                <div className="cert-col">
                    <Reveal direction="left">
                        <div className="cert-card-large shadow-xl flex flex-col w-full h-full">
                            <div className="cert-image-wrapper h-[180px] md:h-[200px] bg-black/40 flex items-center justify-center p-2 pb-1">
                                <img
                                    src="/walmart certificate.jpg"
                                    alt="Walmart Advanced Software Engineering"
                                    className="cert-img-large object-contain max-h-full"
                                />
                            </div>
                            <div className="cert-details-large flex flex-col">
                                <div className="cert-row flex flex-col items-start w-full">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <div className="cert-header flex items-center gap-2 font-bold text-white">
                                            <Award size={14} className="text-[#0071ce] shrink-0" />
                                            <h3 className="text-[13px] leading-tight truncate">Advanced SWE</h3>
                                        </div>
                                        <div className="pl-[20px]">
                                            <p className="cert-issuer text-[9px] font-medium text-gray-400 uppercase tracking-wider">Walmart Global Tech • March 2026</p>
                                        </div>
                                    </div>
                                    <button className="btn-link cert-verify-btn">Verify <ExternalLink size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Cert 5 */}



                <div className="cert-col">
                    <Reveal direction="right" delay={0.4}>
                        <div className="cert-card-large shadow-xl flex flex-col w-full h-full">
                            <div className="cert-image-wrapper h-[180px] md:h-[200px] bg-black/40 flex items-center justify-center p-2 pb-1">
                                <img
                                    src="/openpools-cert.png"
                                    alt="OpenPools Doppelganger Build Sprint"
                                    className="cert-img-large object-contain max-h-full"
                                />
                            </div>
                            <div className="cert-details-large flex flex-col">
                                <div className="cert-row flex flex-col items-start w-full">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <div className="cert-header flex items-center gap-2 font-bold text-white">
                                            <Award size={14} className="text-[#ec4899] shrink-0" />
                                            <h3 className="text-[13px] leading-tight truncate">Doppelganger Participation</h3>
                                        </div>
                                        <div className="pl-[20px]">
                                            <p className="cert-issuer text-[9px] font-medium text-gray-400 uppercase tracking-wider">OpenPools • March 2026</p>
                                        </div>
                                    </div>
                                    <a href="https://www.openpools.in" target="_blank" rel="noopener noreferrer" className="btn-link cert-verify-btn">Verify <ExternalLink size={14} /></a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

            </div>
        </section>
    );
};

export default Certificates;
