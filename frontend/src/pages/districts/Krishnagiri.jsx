import { motion } from 'framer-motion';
import DistrictCard from '../../components/DistrictCard';
import './krishnagiri.css';

import damImage from './district_asset/krishnagiri_dam.jpg';
import fortImage from './district_asset/krishnagiri_fort.jpg';
import padmavathiImage from './district_asset/padmavathi_temple.jpg';
import chandrachoodeswararImage from './district_asset/chandra_choodeswarar.jpg';
import rayakottaiFortImage from './district_asset/rayakottai_fort.jpg';
import melagiriImage from './district_asset/melagiri_hills.jpg';

const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionArticle = motion.article;

export default function Krishnagiri() {
  const historyText =
    'Krishnagiri, often called the Gateway to Tamil Nadu, is a district rich in history, culture, and natural beauty. The land of hills, temples, and forts blends scenic landscapes with deep-rooted traditions. It was part of ancient Mazhavar Nadu and has seen the rule of Vijayanagara kings, Tipu Sultan, and the British.';

  const tourismSpots = [
    { name: 'Krishnagiri Dam', image: damImage, description: 'Built across the Thenpennai River, Krishnagiri Dam is known for boating, scenic views, and relaxing evenings amidst nature.' },
    { name: 'Krishnagiri Fort', image: fortImage, description: 'A monumental fort that echoes the region’s glorious past and offers breathtaking views of the town.' },
    { name: 'Shree Parshwa Padmavathi Shaktipeet Tirth Dham', image: padmavathiImage, description: 'A beautiful Jain temple complex dedicated to Goddess Padmavathi, known for its marble carvings and serene environment.' },
    { name: 'Chandra Choodeswarar Temple', image: chandrachoodeswararImage, description: 'Located atop a hill in Hosur, this temple dedicated to Lord Shiva is both a spiritual and architectural gem.' },
    { name: 'Rayakottai Fort', image: rayakottaiFortImage, description: 'A historical fort built during Tipu Sultan’s reign and a favorite spot for trekkers and history lovers.' },
    { name: 'Melagiri Hills', image: melagiriImage, description: 'A scenic range forming part of the Eastern Ghats, rich in biodiversity and ideal for trekking and eco-tourism.' },
  ];

  const majorTemples = [
    { name: 'Sri Kattu Veera Anjaneya Temple', description: 'Dedicated to Lord Hanuman, famous for the ritual of tying coconuts with ropes for wishes.' },
    { name: 'Arulmighu Sri Chandra Choodeswarar Temple', description: 'Located atop Hosur hill, this temple of Lord Shiva is known for its beautiful Dravidian architecture and divine energy.' },
    { name: 'Dakshina Tirupati Temple', description: 'A southern counterpart of Tirupati Balaji Temple, dedicated to Lord Venkateswara and known for grand celebrations.' },
  ];

  const divisionalDetails = [
    { division: 'Krishnagiri', taluks: ['Krishnagiri', 'Veppanapalli', 'Kaveripattinam'] },
    { division: 'Hosur', taluks: ['Hosur', 'Denkanikottai', 'Thally'] },
    { division: 'Pochampalli', taluks: ['Pochampalli', 'Uthangarai'] },
  ];

  const educationInstitutions = [
    'Government Arts College, Krishnagiri',
    'Adhiyamaan College of Engineering, Hosur',
    'Perarignar Anna College of Arts and Science, Krishnagiri',
    'Er. Perumal Manimekalai College of Engineering, Hosur',
    'Sri Vijay Vidyalaya College of Arts and Science, Dharmapuri Road',
  ];

  return (
    <div className="district-page district-page--krishnagiri" style={{ '--district-accent': '#f4c542', '--district-hero-image': `url(${melagiriImage})` }}>
      <MotionHeader className="district-shell district-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="district-hero__copy">
          <p className="district-kicker">Mazhavar Nadu district guide</p>
          <h1>Discover Krishnagiri District</h1>
          <p className="district-subtitle">The Gateway of Tamil Nadu, reworked into a polished card-led tourism experience.</p>
          <div className="district-hero__chips">
            <span className="district-chip district-chip--accent">Hills</span>
            <span className="district-chip">Forts</span>
            <span className="district-chip">Temples</span>
            <span className="district-chip">Eco-tourism</span>
          </div>
        </div>
        <div className="district-hero__panel">
          <div className="district-hero__panel-inner">
            <p>Featured route</p>
            <h2>Dam viewpoints, heritage forts, and quiet hill escapes in a premium layout.</h2>
            <p>Built to read like a modern travel app with smooth motion and glass surfaces.</p>
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
          <h2>History of Krishnagiri</h2>
          <p>A heritage district that balances scenic energy with a strong historical identity.</p>
        </div>
        <div className="district-panel district-story">{historyText}</div>
      </MotionSection>

      <section id="tourism" className="district-section">
        <div className="district-section__heading">
          <h2>Popular Tourist Attractions</h2>
          <p>Full-bleed cards with layered images, accent borders, and responsive layout.</p>
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
          <p>Elegant info cards for temple trails and heritage experiences.</p>
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
          <p>A compact layout for the district’s core administrative divisions.</p>
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
          <p>Krishnagiri’s education ecosystem, displayed as a polished list panel.</p>
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

