import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <MotionDiv
      className="section-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </MotionDiv>
  );
};

export default SectionHeading;