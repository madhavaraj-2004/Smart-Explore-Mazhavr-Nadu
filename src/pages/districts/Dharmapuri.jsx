import React from "react";
import "./dharmapuri.css";

// ✅ Importing images for tourism spots
import hogenakkalImage from "./district_asset/hogenakkal.jpg";
import vathalmalaiImage from "./district_asset/vathalmalai.jpg";
import thoppaiyarImage from "./district_asset/thoppaiyar.jpg";
import athiyamanImage from "./district_asset/athiyaman_kottai.jpg";
import panchapalliImage from "./district_asset/panchapalli_dam.jpg";

export default function Dharmapuri() {
  //  History content
  const historyText =
    "Dharmapuri, part of the historic Mazhavar Nadu region, , waterfalls, temples, and cultural richness. Known as the 'Niagara of South India' for the majestic Hogenakkal Falls, this district blends scenic charm with deep spiritual roots. It is home to the ancient Theerthamalai Temple, historic Adhiyamankottai Fort, and the legacy of freedom fighter Subramanya Siva. Dharmapuri stands as a true representation of Tamil Nadu’s heritage, history, and devotion.";

  //  Tourism spots
  const tourismSpots = [
    {
      name: "Hogenakkal Falls",
      image: hogenakkalImage,
      description:
        "Famed as the ‘Niagara of South India’, Hogenakkal is Dharmapuri’s star attraction, offering thrilling coracle rides and stunning views of the Cauvery River.",
    },
    {
      name: "Vathalmalai Hills",
      image: vathalmalaiImage,
      description:
        "A peaceful hill station with cool weather, lush greenery, and mesmerizing sunrise and sunset views — perfect for nature lovers and trekkers.",
    },
    {
      name: "Thoppaiyar Dam",
      image: thoppaiyarImage,
      description:
        "A tranquil reservoir surrounded by gentle hills, offering an ideal spot for picnics and birdwatching amidst calm surroundings.",
    },
    {
      name: "Athiyaman Kottai",
      image: athiyamanImage,
      description:
            "A historic fort located near Dharmapuri, Athiyaman Kottai stands as a testament to the valor of King Athiyaman. Surrounded by scenic landscapes, the fort offers a glimpse into the region’s ancient heritage and architecture.",
    },

    {
      name: "Panchapalli Dam",
      image: panchapalliImage,
      description:
        "A scenic dam built across the Sanathkumar River, known for its breezy atmosphere, beautiful landscapes, and peaceful environment.",
    },
  ];

  // ✅ Temples & Heritage Sites
  const majorTemples = [
    {
      name: "Theerthamalai Temple",
      description:
        "One of Dharmapuri’s most famous temples, dedicated to Lord Theerthagirishwarar (Shiva), with sacred springs and panoramic hilltop views.",
    },
    {
      name: "Adhiyamankottai Fort",
      description:
        "A historic fort built by Adhiyaman rulers, showcasing ancient Tamil architecture and the district’s rich medieval heritage.",
    },
    {
      name: "Chenraya Perumal Temple",
      description:
        "An ancient Vishnu temple admired for its beautiful carvings, serene environment, and vibrant annual festivals.",
    },
    {
      name: "Kalabairavar Temple",
      description:
        "Dedicated to Lord Kalabairava, this temple stands in a lush, peaceful area and is known for its spiritual significance.",
    },
    {
      name: "Subramanya Siva Memorial",
      description:
        "A memorial honoring freedom fighter Subramanya Siva, preserving his legacy through writings and photographs.",
    },
    {
      name: "Hanumanthathirtham",
      description:
        "A sacred spot believed to be visited by Lord Hanuman during his journey to Lanka, with holy waters for pilgrims.",
    },
    {
      name: "Kottai Kovil (Lord Shiva Temple)",
      description:
        "A prominent Dravidian temple known for its tall gopuram and stunning stone carvings, central to Dharmapuri’s cultural life.",
    },
  ];

  // ✅ Administrative divisions
  const divisionalDetails = [
    { division: "Dharmapuri", taluks: ["Dharmapuri", "Nallampalli", "Harur"] },
    { division: "Palacode", taluks: ["Palacode", "Pennagaram"] },
    { division: "Pappireddipatti", taluks: ["Pappireddipatti", "Morappur"] },
  ];

  // ✅ Educational institutions
  const educationInstitutions = [
    "Government Arts College (Autonomous), Dharmapuri",
    "Government Engineering College, Dharmapuri",
    "Sakthi Kailash Women’s College",
    "Christ College of Engineering and Technology",
    "Siddhar Sivagnaani Arts & Science College",
    "Sri Vijay Vidyalaya College of Arts and Science",
  ];

  return (
    <div className="dharmapuri-container">
      {/* Header */}
      <header className="dharmapuri-header">
        <h1>Discover Dharmapuri District</h1>
        <div className="dharmapuri-underline"></div>
        <p>The Land of Waterfalls, Hills, and Ancient Temples</p>
      </header>

      {/* Navbar */}
      <nav className="dharmapuri-nav">
        <a href="#history">History</a>
        <a href="#tourism">Tourism</a>
        <a href="#temples">Temples</a>
        <a href="#divisions">Divisions</a>
        <a href="#education">Education</a>
      </nav>

      {/* History Section */}
      <section id="history" className="dharmapuri-section">
        <h2>History of Dharmapuri</h2>
        <p className="dharmapuri-text">{historyText}</p>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="dharmapuri-section">
        <h2>Popular Tourist Attractions</h2>
        <div className="dharmapuri-grid">
          {tourismSpots.map((spot, i) => (
            <div key={i} className="dharmapuri-card glass-card">
              <img src={spot.image} alt={spot.name} />
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Temples Section */}
      <section id="temples" className="dharmapuri-section">
        <h2>Temples and Heritage Sites</h2>
        <div className="dharmapuri-grid">
          {majorTemples.map((temple, i) => (
            <div key={i} className="dharmapuri-card glass-card">
              <h3>{temple.name}</h3>
              <p>{temple.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="dharmapuri-section">
        <h2>Administrative Divisions</h2>
        <div className="dharmapuri-grid">
          {divisionalDetails.map((div, i) => (
            <div key={i} className="dharmapuri-card glass-card">
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
      <section id="education" className="dharmapuri-section">
        <h2>Major Educational Institutions</h2>
        <ul className="dharmapuri-education-list glass-card">
          {educationInstitutions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
