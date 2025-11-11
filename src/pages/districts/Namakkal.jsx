import React from "react";
import "./namakkal.css";

// ✅ Importing images for tourism spots
import fortImage from "./district_asset/namakkal_fort.jpg";
import anjaneyarImage from "./district_asset/namakkal_anjaneyar.jpg";
import kollihillsImage from "./district_asset/kolli_hills.jpg";
import aagayaGangaiImage from "./district_asset/aagaya_gangai.jpg";
import namagiriImage from "./district_asset/namagiri_amman.jpg";
import tiruchengodeImage from "./district_asset/tiruchengode_temple.jpg";
import jedarpalayamImage from "./district_asset/jedarpalayam_dam.jpg";

export default function Namakkal() {
  // ✅ History content
  const historyText =
    "Namakkal, part of the ancient Mazhavar Nadu region, is rich in cultural heritage, temples, and natural beauty. The district is famous for its iconic fort, serene dams, scenic Kolli Hills, and spiritually significant temples. Known for courage and devotion, Namakkal embodies Tamil Nadu’s timeless traditions and architectural brilliance.";

  // ✅ Tourism spots
  const tourismSpots = [
    {
      name: "Namakkal Fort",
      image: fortImage,
      description:
        "A historic landmark atop a massive hill, built during the Madurai Nayak rule. The fort’s elevated position offers stunning panoramic views of Namakkal town and its surroundings.",
    },
    {
      name: "Namakkal Anjaneyar Temple",
      image: anjaneyarImage,
      description:
        "Home to an 18-foot-tall monolithic idol of Lord Hanuman standing without a roof — a unique and powerful symbol of devotion attracting thousands of devotees each year.",
    },
    {
      name: "Kolli Hills",
      image: kollihillsImage,
      description:
        "A beautiful hill range known for misty weather, breathtaking viewpoints, and lush greenery. Ideal for trekking, nature walks, and relaxation amidst pure mountain air.",
    },
    {
      name: "Aagaya Gangai Waterfalls",
      image: aagayaGangaiImage,
      description:
        "A 300-foot waterfall nestled deep in Kolli Hills, surrounded by dense forests. Reaching the falls involves a thrilling descent down steep steps — worth it for the majestic sight.",
    },
    {
      name: "Namagiri Amman Temple",
      image: namagiriImage,
      description:
        "Dedicated to the town’s guardian goddess Namagiri Amman, this temple is central to Namakkal’s spiritual identity and hosts vibrant festivals drawing devotees from across the state.",
    },
    {
      name: "Tiruchengode Ardhanareeswarar Temple",
      image: tiruchengodeImage,
      description:
        "Located atop a hill in Tiruchengode, this ancient temple worships Lord Shiva in the Ardhanareeswarar form — symbolizing the divine unity of male and female energies.",
    },
    {
      name: "Jedarpalayam Dam",
      image: jedarpalayamImage,
      description:
        "A peaceful retreat surrounded by greenery and flowing water, ideal for picnics and quiet relaxation. The dam also serves irrigation needs in the region.",
    },
  ];

  // ✅ Temples & Heritage Sites
  const majorTemples = [
    {
      name: "Namagiri Amman Temple",
      description:
        "One of Namakkal’s most revered temples, symbolizing faith, protection, and prosperity. The temple’s architecture and festivals showcase deep cultural roots.",
    },
    {
      name: "Namakkal Anjaneyar Temple",
      description:
        "Dedicated to Lord Hanuman, this temple’s towering idol and open sky setting make it one of Tamil Nadu’s most distinctive spiritual landmarks.",
    },
    {
      name: "Tiruchengode Ardhanareeswarar Temple",
      description:
        "Perched atop a scenic hill, this temple embodies the harmony of Shiva and Shakti, attracting pilgrims and architecture enthusiasts alike.",
    },
  ];

  // ✅ Administrative divisions
  const divisionalDetails = [
    { division: "Namakkal", taluks: ["Namakkal", "Paramathi-Velur", "Senthamangalam"] },
    { division: "Rasipuram", taluks: ["Rasipuram", "Kolli Hills"] },
    { division: "Tiruchengode", taluks: ["Tiruchengode", "Komarapalayam"] },
  ];

  // ✅ Educational institutions
  const educationInstitutions = [
    "Government Arts College (Autonomous), Namakkal",
    "K.S.R. College of Engineering, Tiruchengode",
    "Paavai Engineering College, Namakkal",
    "Muthayammal College of Arts and Science, Rasipuram",
    "Mahendra Engineering College, Namakkal",
    "P.G.P. College of Arts and Science, Namakkal",
  ];

  return (
    <div className="namakkal-container">
      {/* Header */}
      <header className="namakkal-header">
        <h1>Discover Namakkal District</h1>
        <div className="namakkal-underline"></div>
        <p>The Land of Courage, Temples, and Scenic Hills</p>
      </header>

      {/* Navbar */}
      <nav className="namakkal-nav">
        <a href="#history">History</a>
        <a href="#tourism">Tourism</a>
        <a href="#temples">Temples</a>
        <a href="#divisions">Divisions</a>
        <a href="#education">Education</a>
      </nav>

      {/* History Section */}
      <section id="history" className="namakkal-section">
        <h2>History of Namakkal</h2>
        <p className="namakkal-text">{historyText}</p>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="namakkal-section">
        <h2>Popular Tourist Attractions</h2>
        <div className="namakkal-grid">
          {tourismSpots.map((spot, i) => (
            <div key={i} className="namakkal-card glass-card">
              <img src={spot.image} alt={spot.name} />
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Temples Section */}
      <section id="temples" className="namakkal-section">
        <h2>Temples and Heritage Sites</h2>
        <div className="namakkal-grid">
          {majorTemples.map((temple, i) => (
            <div key={i} className="namakkal-card glass-card">
              <h3>{temple.name}</h3>
              <p>{temple.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="namakkal-section">
        <h2>Administrative Divisions</h2>
        <div className="namakkal-grid">
          {divisionalDetails.map((div, i) => (
            <div key={i} className="namakkal-card glass-card">
              <h3>{div.division} Division</h3>
              <ul>
                {div.taluks.map((taluk, j) => (
                  <li key={j}>{taluk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="namakkal-section">
        <h2>Major Educational Institutions</h2>
        <ul className="namakkal-education-list glass-card">
          {educationInstitutions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
