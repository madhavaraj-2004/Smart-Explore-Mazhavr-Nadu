import { motion } from 'framer-motion';
import DistrictCard from '../../components/DistrictCard';
import './dharmapuri.css';

import hogenakkalImage from './district_asset/hogenakkal.jpg';
import vathalmalaiImage from './district_asset/vathalmalai.jpg';
import thoppaiyarImage from './district_asset/thoppaiyar.jpg';
import athiyamanImage from './district_asset/athiyaman_kottai.jpg';
import panchapalliImage from './district_asset/panchapalli_dam.jpg';

const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionArticle = motion.article;

export default function Dharmapuri() {
  const historyText =
    "Dharmapuri, part of the historic Mazhavar Nadu region, blends waterfalls, temples, and cultural richness. Known as the 'Niagara of South India' for the majestic Hogenakkal Falls, this district combines scenic charm with deep spiritual roots. It is home to the ancient Theerthamalai Temple, historic Adhiyamankottai Fort, and the legacy of freedom fighter Subramanya Siva.";

  const tourismSpots = [
    { name: 'Hogenakkal Falls', image: hogenakkalImage, description: 'Famed as the Niagara of South India, Hogenakkal offers thrilling coracle rides and stunning views of the Cauvery River.' },
    { name: 'Vathalmalai Hills', image: vathalmalaiImage, description: 'A peaceful hill station with cool weather, lush greenery, and mesmerizing sunrise and sunset views.' },
    { name: 'Thoppaiyar Dam', image: thoppaiyarImage, description: 'A tranquil reservoir surrounded by gentle hills, ideal for picnics and birdwatching amidst calm surroundings.' },
    { name: 'Athiyaman Kottai', image: athiyamanImage, description: 'A historic fort near Dharmapuri that stands as a testament to the valor of King Athiyaman and the region’s heritage.' },
    { name: 'Panchapalli Dam', image: panchapalliImage, description: 'A scenic dam built across the Sanathkumar River, known for its breezy atmosphere and peaceful environment.' },
  ];

  const majorTemples = [
    { name: 'Theerthamalai Temple', description: 'One of Dharmapuri’s most famous temples, dedicated to Lord Theerthagirishwarar (Shiva), with sacred springs and panoramic hilltop views.' },
    { name: 'Adhiyamankottai Fort', description: 'A historic fort built by Adhiyaman rulers, showcasing ancient Tamil architecture and the district’s rich medieval heritage.' },
    { name: 'Chenraya Perumal Temple', description: 'An ancient Vishnu temple admired for its beautiful carvings, serene environment, and vibrant annual festivals.' },
    { name: 'Kalabairavar Temple', description: 'Dedicated to Lord Kalabairava, this temple stands in a lush, peaceful area and is known for its spiritual significance.' },
    { name: 'Subramanya Siva Memorial', description: 'A memorial honoring freedom fighter Subramanya Siva, preserving his legacy through writings and photographs.' },
    { name: 'Hanumanthathirtham', description: 'A sacred spot believed to be visited by Lord Hanuman during his journey to Lanka, with holy waters for pilgrims.' },
    { name: 'Kottai Kovil (Lord Shiva Temple)', description: 'A prominent Dravidian temple known for its tall gopuram and stunning stone carvings, central to Dharmapuri’s cultural life.' },
  ];

  const divisionalDetails = [
    { division: 'Dharmapuri', taluks: ['Dharmapuri', 'Nallampalli', 'Harur'] },
    { division: 'Palacode', taluks: ['Palacode', 'Pennagaram'] },
    { division: 'Pappireddipatti', taluks: ['Pappireddipatti', 'Morappur'] },
  ];

  const educationInstitutions = [
    'Government Arts College (Autonomous), Dharmapuri',
    'Government Engineering College, Dharmapuri',
    'Sakthi Kailash Women’s College',
    'Christ College of Engineering and Technology',
    'Siddhar Sivagnaani Arts & Science College',
    'Sri Vijay Vidyalaya College of Arts and Science',
  ];

  return (
    <div className="district-page district-page--dharmapuri" style={{ '--district-accent': '#f4c542', '--district-hero-image': `url(${hogenakkalImage})` }}>
      <MotionHeader className="district-shell district-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="district-hero__copy">
          <p className="district-kicker">Mazhavar Nadu district guide</p>
          <h1>Discover Dharmapuri District</h1>
          <p className="district-subtitle">The Land of Waterfalls, Hills, and Ancient Temples, elevated with a polished glassmorphism experience.</p>
          <div className="district-hero__chips">
            <span className="district-chip district-chip--accent">Waterfalls</span>
            <span className="district-chip">Hill stations</span>
            <span className="district-chip">Temple trails</span>
            <span className="district-chip">Heritage routes</span>
          </div>
        </div>
        <div className="district-hero__panel">
          <div className="district-hero__panel-inner">
            <p>Featured route</p>
            <h2>Coracle rides, cool hill escapes, and spiritually rich heritage stops.</h2>
            <p>Designed to feel like a premium travel app rather than a simple district list.</p>
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
          <h2>History of Dharmapuri</h2>
          <p>Heritage rooted in rivers, forts, devotional culture, and a strong identity within Mazhavarnadu.</p>
        </div>
        <div className="district-panel district-story">{historyText}</div>
      </MotionSection>

      <section id="tourism" className="district-section">
        <div className="district-section__heading">
          <h2>Popular Tourist Attractions</h2>
          <p>Immersive destination cards with layered image treatment and soft highlight borders.</p>
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
          <p>Compact heritage cards for sacred sites, memorials, and historical landmarks.</p>
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
          <p>District administration presented in a clean and readable card rhythm.</p>
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
          <p>Education support across Dharmapuri, framed as a premium highlight list.</p>
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
