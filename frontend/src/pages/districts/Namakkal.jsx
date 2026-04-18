import { motion } from 'framer-motion';
import DistrictCard from '../../components/DistrictCard';
import './namakkal.css';

import fortImage from './district_asset/namakkal_fort.jpg';
import anjaneyarImage from './district_asset/namakkal_anjaneyar.jpg';
import kollihillsImage from './district_asset/kolli_hills.jpg';
import aagayaGangaiImage from './district_asset/aagaya_gangai.jpg';
import namagiriImage from './district_asset/namagiri_amman.jpg';
import tiruchengodeImage from './district_asset/tiruchengode_temple.JPG';
import jedarpalayamImage from './district_asset/jedarpalayam_dam.jpg';

const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionArticle = motion.article;

export default function Namakkal() {
  const historyText =
    'Namakkal, part of the ancient Mazhavar Nadu region, is rich in cultural heritage, temples, and natural beauty. The district is famous for its iconic fort, serene dams, scenic Kolli Hills, and spiritually significant temples. Known for courage and devotion, Namakkal embodies Tamil Nadu’s timeless traditions and architectural brilliance.';

  const tourismSpots = [
    { name: 'Namakkal Fort', image: fortImage, description: 'A historic landmark atop a massive hill, built during the Madurai Nayak rule and offering panoramic views of the town.' },
    { name: 'Namakkal Anjaneyar Temple', image: anjaneyarImage, description: 'Home to an 18-foot-tall monolithic idol of Lord Hanuman standing without a roof, a unique symbol of devotion.' },
    { name: 'Kolli Hills', image: kollihillsImage, description: 'A beautiful hill range known for misty weather, breathtaking viewpoints, and lush greenery.' },
    { name: 'Aagaya Gangai Waterfalls', image: aagayaGangaiImage, description: 'A 300-foot waterfall nestled deep in Kolli Hills, surrounded by dense forests and dramatic scenery.' },
    { name: 'Namagiri Amman Temple', image: namagiriImage, description: 'Dedicated to the town’s guardian goddess, this temple is central to Namakkal’s spiritual identity.' },
    { name: 'Tiruchengode Ardhanareeswarar Temple', image: tiruchengodeImage, description: 'An ancient hill temple worshipping Lord Shiva in the Ardhanareeswarar form, symbolizing divine unity.' },
    { name: 'Jedarpalayam Dam', image: jedarpalayamImage, description: 'A peaceful retreat surrounded by greenery and flowing water, ideal for picnics and quiet relaxation.' },
  ];

  const majorTemples = [
    { name: 'Namagiri Amman Temple', description: 'One of Namakkal’s most revered temples, symbolizing faith, protection, and prosperity.' },
    { name: 'Namakkal Anjaneyar Temple', description: 'Dedicated to Lord Hanuman, this temple’s towering idol and open sky setting make it a distinctive spiritual landmark.' },
    { name: 'Tiruchengode Ardhanareeswarar Temple', description: 'Perched atop a scenic hill, this temple embodies the harmony of Shiva and Shakti.' },
  ];

  const divisionalDetails = [
    { division: 'Namakkal', taluks: ['Namakkal', 'Paramathi-Velur', 'Senthamangalam'] },
    { division: 'Rasipuram', taluks: ['Rasipuram', 'Kolli Hills'] },
    { division: 'Tiruchengode', taluks: ['Tiruchengode', 'Komarapalayam'] },
  ];

  const educationInstitutions = [
    'Government Arts College (Autonomous), Namakkal',
    'K.S.R. College of Engineering, Tiruchengode',
    'Paavai Engineering College, Namakkal',
    'Muthayammal College of Arts and Science, Rasipuram',
    'Mahendra Engineering College, Namakkal',
    'P.G.P. College of Arts and Science, Namakkal',
  ];

  return (
    <div className="district-page district-page--namakkal" style={{ '--district-accent': '#f4c542', '--district-hero-image': `url(${kollihillsImage})` }}>
      <MotionHeader className="district-shell district-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="district-hero__copy">
          <p className="district-kicker">Mazhavar Nadu district guide</p>
          <h1>Discover Namakkal District</h1>
          <p className="district-subtitle">The Land of Courage, Temples, and Scenic Hills, designed as a refined tourism showcase.</p>
          <div className="district-hero__chips">
            <span className="district-chip district-chip--accent">Hill routes</span>
            <span className="district-chip">Temple heritage</span>
            <span className="district-chip">Waterfalls</span>
            <span className="district-chip">Ancient fort</span>
          </div>
        </div>
        <div className="district-hero__panel">
          <div className="district-hero__panel-inner">
            <p>Featured route</p>
            <h2>Fort views, Kolli Hills, and legendary temple landmarks in one premium journey.</h2>
            <p>The visual language is tuned for desktop, tablet, and mobile browsing.</p>
          </div>
        </div>
      </MotionHeader>

      <nav className="district-nav">
        <a href="#history">History</a>
        <a href="#tourism">Tourism</a>
        <a href="#temples">Temples</a>
        <a href="#divisions">Divisions</a>
        <a href="#education">Education</a>
      </nav>

      <MotionSection id="history" className="district-section" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.55 }}>
        <div className="district-section__heading">
          <h2>History of Namakkal</h2>
          <p>Temples, hills, and fort architecture define Namakkal’s distinct identity within Mazhavarnadu.</p>
        </div>
        <div className="district-panel district-story">{historyText}</div>
      </MotionSection>

      <section id="tourism" className="district-section">
        <div className="district-section__heading">
          <h2>Popular Tourist Attractions</h2>
          <p>Card-based storytelling with layered imagery and smooth lift animations.</p>
        </div>
        <div className="district-grid">
          {tourismSpots.map((spot, i) => (
            <DistrictCard key={spot.name} image={spot.image} title={spot.name} description={spot.description} tag={i === 0 ? 'Featured' : 'Explore'} accent="#f4c542" delay={i * 0.08} featured={i === 0} />
          ))}
        </div>
      </section>

      <section id="temples" className="district-section">
        <div className="district-section__heading">
          <h2>Temples and Heritage Sites</h2>
          <p>Compact information cards for the district’s spiritual highlights.</p>
        </div>
        <div className="district-grid district-grid--compact">
          {majorTemples.map((temple, i) => (
            <MotionArticle key={temple.name} className="district-info-card district-panel" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <h3>{temple.name}</h3>
              <p>{temple.description}</p>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section id="divisions" className="district-section">
        <div className="district-section__heading">
          <h2>Administrative Divisions</h2>
          <p>A clean administrative overview with airy panels and readable lists.</p>
        </div>
        <div className="district-list-grid">
          {divisionalDetails.map((div, i) => (
            <MotionArticle key={div.division} className="district-info-card district-panel" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <h3>{div.division} Division</h3>
              <ul>
                {div.taluks.map((taluk) => (
                  <li key={taluk}>{taluk}</li>
                ))}
              </ul>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section id="education" className="district-section">
        <div className="district-section__heading">
          <h2>Major Educational Institutions</h2>
          <p>Education cards keep the section compact without losing visual polish.</p>
        </div>
        <ul className="district-education-list district-panel">
          {educationInstitutions.map((inst) => (
            <li key={inst}>{inst}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
