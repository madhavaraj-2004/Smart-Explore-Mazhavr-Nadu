import React from "react";
import "./Salem.css";

const Salem = () => {
  // --- History Text ---
  const historyText =
    "Salem, historically a central part of the ancient Mazhavar Nadu region, boasts a deep cultural heritage. Its name is believed to have evolved from 'Cheralam' or 'Sailam' (hill country). The region was under the rule of various dynasties, including the Cheras and Cholas. A notable figure associated with this area is the chieftain Valvil Ori, a legendary archer celebrated in Sangam literature for his valor and patronage of the arts. Salem served as a significant administrative and trade hub, particularly known for its textile industry and mineral wealth (magnesite and iron ore) through the centuries.";

  // --- Tourism Spots (with images) ---
  const tourismSpots = [
    {
      name: "Yercaud",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7f/Yercaud_Lake.jpg",
      description:
        "A beautiful hill station in the Shevaroy Hills, known for pleasant weather, coffee plantations, Big Lake, and scenic viewpoints.",
    },
    {
      name: "Kiliyur Falls",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Kiliyur_Falls_Yercaud.jpg",
      description:
        "A 300-foot waterfall in Yercaud, best visited after the monsoon season, offering a picturesque and refreshing view.",
    },
    {
      name: "Mettur Dam",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Mettur_Dam.jpg",
      description:
        "One of the largest dams in India, built across the Kaveri River. It provides irrigation and hydroelectric power to the region.",
    },
    {
      name: "Kurumbapatti Zoological Park",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Kurumbapatti_zoo_entrance.jpg",
      description:
        "A mini-zoo near Salem city, home to various species of birds and animals — a perfect destination for family outings.",
    },
    {
      name: "Mutthumalai Forest",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Servarayan_Hills_Yercaud.jpg",
      description:
        "A lush green forest area near Yercaud, offering trekking trails and panoramic valley views. Ideal for nature lovers and explorers.",
    },
    {
      name: "Sankagiri Fort",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sankagiri_Fort.jpg",
      description:
        "An ancient fort built during the Vijayanagara Empire, later used by the British. It offers historic charm and great hilltop views.",
    },
  ];

  // --- Major Temples ---
  const majorTemples = [
    {
      name: "Kottai Mariamman Temple",
      description:
        "One of the most famous temples in Salem, dedicated to Goddess Mariamman, known for the grand annual festival and cultural significance.",
    },
    {
      name: "Sugavaneshwarar Temple",
      description:
        "An ancient Shiva temple located in the heart of Salem city, with inscriptions dating back to the 13th century.",
    },
    {
      name: "Thandondriswarar Temple (Belur)",
      description:
        "A beautiful hill temple near Belur dedicated to Lord Shiva, offering spiritual peace and scenic surroundings.",
    },
    {
      name: "Kailasanathar Temple (Tharamangalam)",
      description:
        "A remarkable architectural wonder built during the Vijayanagara period, with intricate stone carvings and rotating sculptures.",
    },
    {
      name: "Karapuranathar Temple (Uthamasolapuram)",
      description:
        "Dedicated to Lord Shiva, this temple holds ancient significance and showcases beautiful Dravidian-style architecture.",
    },
    {
      name: "Skandashramam Murugan Temple",
      description:
        "A serene temple dedicated to Lord Murugan, offering a panoramic view of Salem city from its hilltop location.",
    },
  ];

  // --- Divisional Details ---
  const divisionalDetails = [
    { division: "Salem", taluks: ["Salem North", "Salem South", "Salem West"] },
    { division: "Attur", taluks: ["Attur", "Gangavalli", "Pethanaickenpalayam"] },
    { division: "Mettur", taluks: ["Mettur", "Kolathur"] },
    { division: "Omalur", taluks: ["Omalur", "Tharamangalam", "Kadayampatti"] },
    { division: "Sankari", taluks: ["Sankari", "Edappadi"] },
  ];

  // --- Educational Institutions ---
  const educationInstitutions = [
    "Periyar University (State University)",
    "Government Arts College (Salem)",
    "Sona College of Technology (Autonomous)",
    "Vinayaka Missions Research Foundation (Deemed University)",
    "Government Engineering College, Salem",
    "Salem Medical College (Mohan Kumaramangalam Medical College)",
  ];

  // --- Smooth Scroll Function ---
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="salem-page-container">
      {/* Header Section */}
      <header className="page-header">
        <h1 className="header-title">Discover Salem District</h1>
        <p className="header-subtitle">
          The Mango City and a gateway to the historic Mazhavar Nadu region.
        </p>
      </header>

      {/* Section Navigation */}
      <nav className="section-nav">
        <button className="anchor-link" onClick={() => scrollToSection("history-section")}>
          History
        </button>
        <button className="anchor-link" onClick={() => scrollToSection("tourism-section")}>
          Tourism
        </button>
        <button className="anchor-link" onClick={() => scrollToSection("temples-section")}>
          Temples
        </button>
        <button className="anchor-link" onClick={() => scrollToSection("divisions-section")}>
          Divisions
        </button>
        <button className="anchor-link" onClick={() => scrollToSection("education-section")}>
          Education
        </button>
      </nav>

      <main className="page-content-wrapper">
        {/* 1. History Section */}
        <section id="history-section" className="section-container">
          <h2 className="section-title">History of Salem</h2>
          <p className="section-paragraph">{historyText}</p>
        </section>

        <hr className="section-divider" />

        {/* 2. Tourism Section */}
        <section id="tourism-section" className="section-container">
          <h2 className="section-title">Popular Tourist Places</h2>
          <div className="grid-layout grid-2">
            {tourismSpots.map((spot, index) => (
              <div key={index} className="card tourism-card">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="tourism-image rounded-md mb-3 w-full h-48 object-cover"
                />
                <h3 className="card-title">{spot.name}</h3>
                <p className="card-description">{spot.description}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* 3. Major Temples Section */}
        <section id="temples-section" className="section-container">
          <h2 className="section-title">Major Temples in Salem</h2>
          <div className="grid-layout grid-2">
            {majorTemples.map((temple, index) => (
              <div key={index} className="card temple-card">
                <h3 className="card-title">{temple.name}</h3>
                <p className="card-description">{temple.description}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* 4. Divisional Details */}
        <section id="divisions-section" className="section-container">
          <h2 className="section-title">Administrative Divisional Details</h2>
          <p className="section-subtitle">Revenue Divisions and their Taluks</p>
          <div className="grid-layout grid-responsive-cards">
            {divisionalDetails.map((detail, index) => (
              <div key={index} className="card division-card">
                <h3 className="card-title division-title">
                  {detail.division} Division
                </h3>
                <ul className="division-taluks-list">
                  {detail.taluks.map((taluk, i) => (
                    <li key={i}>{taluk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* 5. Education Section */}
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
