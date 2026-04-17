// src/components/HighlightsSection.jsx

import React from 'react';
// Correct the import path to include the file extension
import HighlightCard from './HighlightCard.jsx';

const highlights = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>,
        title: "Rich Heritage",
        description: "Ancient temples, historic forts, and cultural landmarks that tell the story of centuries past"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-6 0v4"></path><rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect></svg>,
        title: "Scenic Tourism",
        description: "Breathtaking hills, cascading waterfalls, and natural beauty perfect for memorable experiences"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>,
        title: "Thriving Industries",
        description: "From steel production to agriculture, a region that balances tradition with modern progress"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>,
        title: "Vibrant Culture",
        description: "Festivals, traditional arts, cuisine, and customs that celebrate the essence of Tamil heritage"
    }
];

const HighlightsSection = () => {
    return (
        <section className="highlights-section">
            <div className="section-container">
                <h2 className="section-title">Discover Mazhavar Nadu</h2>
                <div className="highlights-grid">
                    {highlights.map((highlight, index) => (
                        <HighlightCard
                            key={index}
                            icon={highlight.icon}
                            title={highlight.title}
                            description={highlight.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightsSection;