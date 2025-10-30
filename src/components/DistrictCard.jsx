import React from 'react';

// A reusable component for displaying a single district.
const DistrictCard = ({ name, description, imageUrl }) => {
    return (
        <div className="district-card">
            <div className="district-image">
                <img src={imageUrl} alt={`${name} District`} />
            </div>
            <div className="district-content">
                <h3 className="district-name">{name}</h3>
                <p className="district-description">{description}</p>
            </div>
        </div>
    );
};

export default DistrictCard;
