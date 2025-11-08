import React from 'react';
// Assuming you have a main CSS file that defines classes like
// .section-container, .grid-2, .card, .anchor-link, etc.

const Salem = () => {
  // Data for the sections
  const historyText =
    "Salem, historically a central part of the ancient Mazhavar Nadu region, boasts a deep cultural heritage. Its name is believed to have evolved from 'Cheralam' or 'Sailam' (hill country). The region was under the rule of various dynasties, including the Cheras and Cholas. A notable figure associated with this area is the chieftain **Valvil Ori**, a legendary archer celebrated in Sangam literature for his valor and patronage of the arts. Salem served as a significant administrative and trade hub, particularly known for its textile industry and mineral wealth (magnesite and iron ore) through the centuries.";

  const tourismSpots = [
    {
      name: 'Yercaud',
      description:
        "A beautiful hill station located in the Shevaroy Hills, known for its pleasant weather, coffee plantations, Big Lake, and scenic viewpoints.",
    },
    {
      name: 'Kiliyur Falls',
      description:
        "A stunning 300-foot waterfall in Yercaud that is best visited after the monsoon season, offering a picturesque and refreshing sight.",
    },
    {
      name: 'Mettur Dam',
      description:
        "One of the largest dams in India, built across the Kaveri river. It is a major source of irrigation and hydroelectric power in the region.",
    },
    {
      name: 'Kurumbapatti Zoological Park',
      description:
        "A mini-zoo near Salem city, providing a home for various species of birds and animals, ideal for a family outing.",
    },
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
    'Government Arts College (Salem)',
    'Sona College of Technology (Autonomous)',
    'Vinayaka Missions Research Foundation (Deemed University)',
    'Government Engineering College, Salem',
    'Salem Medical College (Mohan Kumaramangalam Medical College)',
  ];

  // Helper function for smooth scrolling
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="salem-page-container">
      {/* --- Header Section --- */}
      <header className="page-header">
        <h1 className="header-title">Discover Salem District</h1>
        <p className="header-subtitle">
          The Mango City and a gateway to the historic Mazhavar Nadu region.
        </p>
      </header>

      {/* --- Navigation Bar for Sections (Smooth Scroll) --- */}
      <nav className="section-nav">
        <button
          className="anchor-link"
          onClick={() => scrollToSection('history-section')}
        >
          History
        </button>
        <button
          className="anchor-link"
          onClick={() => scrollToSection('tourism-section')}
        >
          Tourism
        </button>
        <button
          className="anchor-link"
          onClick={() => scrollToSection('divisions-section')}
        >
          Divisions
        </button>
        <button
          className="anchor-link"
          onClick={() => scrollToSection('education-section')}
        >
          Education
        </button>
      </nav>

      <main className="page-content-wrapper">
        {/* 1. History Section */}
        <section id="history-section" className="section-container">
          <h2 className="section-title">History of Salem</h2>
          <p className="section-paragraph">{historyText}</p>
        </section>

        {/* --- Divider --- */}
        <hr className="section-divider" />

        {/* 2. Tourism Section */}
        <section id="tourism-section" className="section-container">
          <h2 className="section-title">Popular Tourist Places</h2>
          <div className="grid-layout grid-2">
            {tourismSpots.map((spot, index) => (
              <div key={index} className="card tourism-card">
                <h3 className="card-title">{spot.name}</h3>
                <p className="card-description">{spot.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Divider --- */}
        <hr className="section-divider" />

        {/* 3. Divisional Details Section */}
        <section id="divisions-section" className="section-container">
          <h2 className="section-title">Administrative Divisional Details</h2>
          <p className="section-subtitle">Revenue Divisions and their Taluks</p>
          <div className="grid-layout grid-responsive-cards">
            {divisionalDetails.map((detail, index) => (
              <div key={index} className="card division-card">
                <h3 className="card-title division-title">
                  {detail.division} Division
                </h3>
                <p className="division-taluks-title">Taluks:</p>
                <ul className="division-taluks-list">
                  {detail.taluks.map((taluk, i) => (
                    <li key={i}>{taluk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Divider --- */}
        <hr className="section-divider" />

        {/* 4. Education Section */}
        <section id="education-section" className="section-container">
          <h2 className="section-title">Major Educational Institutions</h2>
          <ul className="institution-list">
            {educationInstitutions.map((institution, index) => (
              <li key={index} className="institution-item">
                {institution}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Salem;