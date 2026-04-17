import { motion } from 'framer-motion';
import DistrictCard from '../../components/DistrictCard';
import './Salem.css';

import yercaudImage from './district_asset/yercaud.jpg';
import killiyurImage from './district_asset/killiyurfalls.jpg';
import kurumbapattiImage from './district_asset/kurumbapatti.jpg';
import metturdamImage from './district_asset/metturdam.jpg';
import muttalImage from './district_asset/muttalfalls.jpg';
import sankagiriImage from './district_asset/sankagirifort.jpg';

const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionArticle = motion.article;

export default function Salem() {
  const historyText =
    "Salem, historically a central part of the ancient Mazhavar Nadu region, boasts a deep cultural heritage. Its name is believed to have evolved from 'Cheralam' or 'Sailam' (hill country). The region was under the rule of various dynasties, including the Cheras and Cholas. A notable figure associated with this area is the chieftain Valvil Ori, a legendary archer celebrated in Sangam literature for his valor and patronage of the arts. Salem served as a significant administrative and trade hub, particularly known for its textile industry and mineral wealth (magnesite and iron ore) through the centuries.";

  const tourismSpots = [
    { name: 'Yercaud', image: yercaudImage, description: 'A beautiful hill station in the Shevaroy Hills, known for pleasant weather, coffee plantations, Big Lake, and scenic viewpoints.' },
    { name: 'Kiliyur Falls', image: killiyurImage, description: 'A 300-foot waterfall in Yercaud, best visited after the monsoon season, offering a picturesque and refreshing view.' },
    { name: 'Mettur Dam', image: metturdamImage, description: 'One of the largest dams in India, built across the Kaveri River. It provides irrigation and hydroelectric power to the region.' },
    { name: 'Kurumbapatti Zoological Park', image: kurumbapattiImage, description: 'A mini-zoo near Salem city, home to various species of birds and animals, a perfect destination for family outings.' },
    { name: 'Muttal Falls', image: muttalImage, description: 'Located near Muttal village, this serene waterfall is surrounded by dense greenery and rocky terrain, a hidden natural gem for visitors.' },
    { name: 'Sankagiri Fort', image: sankagiriImage, description: 'An ancient fort built during the Vijayanagara Empire, later used by the British. It offers historic charm and great hilltop views.' },
  ];

  const majorTemples = [
    { name: 'Kottai Mariamman Temple', description: 'One of the most famous temples in Salem, dedicated to Goddess Mariamman, known for the grand annual festival and cultural significance.' },
    { name: 'Sugavaneshwarar Temple', description: 'An ancient Shiva temple located in the heart of Salem city, with inscriptions dating back to the 13th century.' },
    { name: 'Thandondriswarar Temple (Belur)', description: 'A beautiful hill temple near Belur dedicated to Lord Shiva, offering spiritual peace and scenic surroundings.' },
    { name: 'Kailasanathar Temple (Tharamangalam)', description: 'A remarkable architectural wonder built during the Vijayanagara period, with intricate stone carvings and rotating sculptures.' },
    { name: 'Karapuranathar Temple (Uthamasolapuram)', description: 'Dedicated to Lord Shiva, this temple holds ancient significance and showcases beautiful Dravidian-style architecture.' },
    { name: 'Skandashramam Murugan Temple', description: 'A serene temple dedicated to Lord Murugan, offering a panoramic view of Salem city from its hilltop location.' },
  ];

  const divisionalDetails = [
    { division: 'Salem', taluks: ['Salem North', 'Salem South', 'Salem West'] },
    { division: 'Attur', taluks: ['Attur', 'Gangavalli', 'Pethanaickenpalayam'] },
    { division: 'Mettur', taluks: ['Mettur', 'Kolathur'] },
    { division: 'Omalur', taluks: ['Omalur', 'Tharamangalam', 'Kadayampatti'] },
    { division: 'Sankari', taluks: ['Sankari', 'Edappadi'] },
  ];

  const educationInstitutions = [
    'Periyar University (State University)',
    'Government Arts College (Autonomous), Salem-7',
    'Government Engineering College, Salem',
    'Salem Medical College (Mohan Kumaramangalam Medical College)',
    'Sona College of Technology (Autonomous)',
    'Vinayaka Missions Research Foundation (Deemed University)',
    'AVS College of Arts and Science (Autonomous)',
  ];

  return (
    <div className="district-page district-page--salem" style={{ '--district-accent': '#f4c542', '--district-hero-image': `url(${yercaudImage})` }}>
      <MotionHeader className="district-shell district-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="district-hero__copy">
          <p className="district-kicker">Mazhavar Nadu district guide</p>
          <h1>Discover Salem District</h1>
          <p className="district-subtitle">The Mango City and gateway to the historic Mazhavar Nadu region, reimagined with a premium tourism-first layout.</p>
          <div className="district-hero__chips">
            <span className="district-chip district-chip--accent">Hill stations</span>
            <span className="district-chip">Historic forts</span>
            <span className="district-chip">Sacred temples</span>
            <span className="district-chip">Education hub</span>
          </div>
        </div>
        <div className="district-hero__panel">
          <div className="district-hero__panel-inner">
            <p>Featured route</p>
            <h2>Yercaud, Mettur, and temple trails with a cinematic city experience.</h2>
            <p>Scroll through curated landmarks, heritage stops, and education highlights crafted for mobile and desktop.</p>
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
          <h2>History of Salem</h2>
          <p>A layered story of trade, craftsmanship, dynasties, and the cultural heartbeat of Mazhavarnadu.</p>
        </div>
        <div className="district-panel district-story">{historyText}</div>
      </MotionSection>

      <section id="tourism" className="district-section">
        <div className="district-section__heading">
          <h2>Popular Tourist Places</h2>
          <p>Glassmorphism destination cards with full-bleed imagery and hover lift effects.</p>
        </div>
        <div className="district-grid">
          {tourismSpots.map((spot, i) => (
            <DistrictCard key={spot.name} image={spot.image} title={spot.name} description={spot.description} tag={i === 0 ? 'Featured' : 'Explore'} accent="#f4c542" delay={i * 0.08} featured={i === 0} />
          ))}
        </div>
      </section>

      <section id="temples" className="district-section">
        <div className="district-section__heading">
          <h2>Major Temples in Salem</h2>
          <p>Elegant information cards for the district’s spiritual and architectural heritage.</p>
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
          <p>Key revenue divisions and taluks, presented in compact premium panels.</p>
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
          <p>Salem’s education ecosystem, arranged as a polished highlight list.</p>
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
