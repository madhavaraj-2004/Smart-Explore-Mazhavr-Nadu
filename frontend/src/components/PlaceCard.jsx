import { motion } from 'framer-motion';

const MotionArticle = motion.article;

const PlaceCard = ({ image, title, description, tag, compact = false }) => {
  return (
    <MotionArticle
      className={`place-card${compact ? ' place-card-compact' : ''}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <img src={image} alt={title} loading="lazy" decoding="async" />
      <div className="place-card-body">
        {tag ? <span className="card-tag">{tag}</span> : null}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </MotionArticle>
  );
};

export default PlaceCard;