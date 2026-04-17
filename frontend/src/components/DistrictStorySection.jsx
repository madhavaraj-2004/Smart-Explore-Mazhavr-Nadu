import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import dharmapuriImage from '../assets/dharmapuri-district.jpg';
import krishnagiriImage from '../assets/krishnagiri-district.jpg';
import namakkalImage from '../assets/namakkal-district.jpg';
import salemImage from '../assets/salem-district.jpg';

const MotionArticle = motion.article;

const districts = [
  {
    name: 'Salem',
    to: '/salem',
    image: salemImage,
    description:
      'Misty hill roads, temple heritage, and vibrant local markets make Salem the gateway to Mazhavarnadu stories.',
  },
  {
    name: 'Dharmapuri',
    to: '/dharmapuri',
    image: dharmapuriImage,
    description:
      'Dharmapuri blends river landscapes and sacred trails with dramatic waterfall energy around Hogenakkal.',
  },
  {
    name: 'Krishnagiri',
    to: '/krishnagiri',
    image: krishnagiriImage,
    description:
      'Fort silhouettes, mango belts, and rocky horizons shape Krishnagiri into a bold historical and natural destination.',
  },
  {
    name: 'Namakkal',
    to: '/namakkal',
    image: namakkalImage,
    description:
      'Namakkal offers temple-town rhythm, iconic rock landmarks, and deeply rooted cultural identity.',
  },
];

const DistrictStorySection = () => {
  return (
    <section className="district-story shell" id="district-story">
      <header className="district-story-head">
        <p className="eyebrow">Scroll storytelling</p>
        <h2>Journey through the four districts</h2>
        <p>
          Scroll to explore each district with cinematic cards, smooth motion, and direct access to full district pages.
        </p>
      </header>

      <div className="district-story-list">
        {districts.map((district, index) => (
          <MotionArticle
            key={district.name}
            className="district-story-item"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
          >
            <Link className="district-story-card" to={district.to} aria-label={`Open ${district.name} district`}>
              <img src={district.image} alt={`${district.name} landscape`} loading="lazy" decoding="async" />

              <div className="district-story-overlay">
                <span className="district-story-chip">District</span>
                <h3>{district.name}</h3>
                <p>{district.description}</p>
                <span className="district-story-cta">Explore now</span>
              </div>
            </Link>
          </MotionArticle>
        ))}
      </div>
    </section>
  );
};

export default DistrictStorySection;
