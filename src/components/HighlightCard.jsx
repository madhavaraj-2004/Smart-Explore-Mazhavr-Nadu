// src/components/HighlightCard.jsx

import React from 'react';

const HighlightCard = ({ icon, title, description }) => {
    return (
        <div className="highlight-card">
            <div className="highlight-icon">{icon}</div>
            <h3 className="highlight-title">{title}</h3>
            <p className="highlight-description">{description}</p>
        </div>
    );
};

export default HighlightCard;