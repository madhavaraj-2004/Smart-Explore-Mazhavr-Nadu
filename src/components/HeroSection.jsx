import heroBackground from '../assets/hero-background.jpg';

const HeroSection = () => {
    return (
        <section className="hero-section" id="home">
            <div className="hero-background" style={{ backgroundImage: `url(${heroBackground})` }}></div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Welcome to <span className="hero-highlight">Mazhavar Nadu</span>
                    </h1>
                    <p className="hero-tagline">யாதும் ஊரே யாவரும் கேளிர்</p>
                    <p className="hero-description">
                        Discover the rich cultural heritage, ancient temples, rolling hills, and vibrant traditions 
                        of the historic Mazhavar Nadu region spanning across Salem, Dharmapuri, Krishnagiri, and Namakkal districts.
                    </p>
                    <div className="hero-buttons">
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;