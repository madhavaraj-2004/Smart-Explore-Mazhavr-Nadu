import { motion } from 'framer-motion';

const MotionArticle = motion.article;

const DistrictCard = ({ image, title, description, tag, accent = '#f7c948', delay = 0, featured = false }) => {
  return (
    <MotionArticle
      className={`district-card ${featured ? 'district-card--featured' : ''}`}
      style={{
        '--district-card-image': image ? `url(${image})` : 'linear-gradient(135deg, #1f2937 0%, #0f172a 55%, #111827 100%)',
        '--district-card-accent': accent,
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="district-card__overlay" aria-hidden="true" />
      <div className="district-card__content">
        {tag ? <span className="district-card__tag">{tag}</span> : null}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </MotionArticle>
  );
};

export default DistrictCard;
