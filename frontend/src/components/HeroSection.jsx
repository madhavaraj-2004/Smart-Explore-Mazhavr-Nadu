import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import heroBackground from '../assets/hero-background.jpg';
import heroVideo from '../assets/Mazhavarnadu.mp4';


const MotionDiv = motion.div;
const HERO_VIDEO_SRC = heroVideo;
const HERO_VIDEO_PUBLIC_FALLBACK = '/videos/mazhavarnadu-tourism.mp4';

const HeroSection = () => {
    const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const saveDataEnabled = Boolean(navigator.connection?.saveData);

        if (prefersReducedMotion || saveDataEnabled) {
            setShouldPlayVideo(false);
        }
    }, []);

    useEffect(() => {
        if (!shouldPlayVideo || !videoRef.current) {
            return;
        }

        const promise = videoRef.current.play();
        if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {
                setShouldPlayVideo(false);
            });
        }
    }, [shouldPlayVideo]);

    return (
        <section className="hero-video-section" id="home">
            <div className="hero-video-media" aria-hidden="true">
                {shouldPlayVideo ? (
                    <video
                        ref={videoRef}
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={heroBackground}
                        onError={() => setShouldPlayVideo(false)}
                    >
                        <source src={HERO_VIDEO_SRC} type="video/mp4" />
                        <source src={HERO_VIDEO_PUBLIC_FALLBACK} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={heroBackground}
                        alt="Scenic view of Mazhavarnadu"
                        className="hero-video-fallback"
                        loading="eager"
                        decoding="async"
                    />
                )}
            </div>

            <div className="hero-video-overlay" />

            <MotionDiv
                className="hero-video-content shell"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
            >
                <h1>Discover Mazhavarnadu</h1>
                <p>Explore Salem, Dharmapuri, Krishnagiri, Namakkal</p>
            </MotionDiv>
        </section>
    );
};

export default HeroSection;
