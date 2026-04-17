import { AnimatePresence, motion } from 'framer-motion';
import PlaceCard from './PlaceCard';

const MotionArticle = motion.article;

const PlacesList = ({ places }) => {
  if (!places.length) {
    return <p className="places-empty">No places found for the selected district.</p>;
  }

  return (
    <div className="card-grid card-grid-featured">
      <AnimatePresence mode="popLayout">
        {places.map((place) => (
          <MotionArticle
            key={place.title}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="place-card-motion-wrap"
          >
            <PlaceCard {...place} />
          </MotionArticle>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PlacesList;