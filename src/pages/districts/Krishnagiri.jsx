import React from "react";
import "./krishnagiri.css";

// ✅ Importing top 6 tourism spot images
import damImage from "./district_asset/krishnagiri_dam.jpg";
import fortImage from "./district_asset/krishnagiri_fort.jpg";
import padmavathiImage from "./district_asset/padmavathi_temple.jpg";
import chandrachoodeswararImage from "./district_asset/chandra_choodeswarar.jpg";
import rayakottaiFortImage from "./district_asset/rayakottai_fort.jpg";
import melagiriImage from "./district_asset/melagiri_hills.jpg";

export default function Krishnagiri() {
  // ✅ History content
  const historyText =
    "Krishnagiri, often called the ‘Gateway to Tamil Nadu’, is a district rich in history, culture, and natural beauty. The land of hills, temples, and forts, Krishnagiri blends scenic landscapes with deep-rooted traditions. It was part of the ancient Mazhavar Nadu and has seen the rule of Vijayanagara kings, Tipu Sultan, and the British. Today, it stands as a fast-growing region that preserves its historical essence while embracing modern development.";

  // ✅ Only 6 major tourism spots
  const tourismSpots = [
    {
      name: "Krishnagiri Dam",
      image: damImage,
      description:
        "Built across the Thenpennai River, Krishnagiri Dam is one of the district’s top attractions. It’s known for boating, scenic views, and relaxing evenings amidst nature.",
    },
    {
      name: "Krishnagiri Fort",
      image: fortImage,
      description:
        "A monumental fort that echoes the region’s glorious past. Built by the Vijayanagara rulers and later strengthened by Tipu Sultan, it offers breathtaking views of the town.",
    },
    {
      name: "Shree Parshwa Padmavathi Shaktipeet Tirth Dham",
      image: padmavathiImage,
      description:
        "A beautiful Jain temple complex dedicated to Goddess Padmavathi, known for its marble carvings, serene environment, and peaceful spiritual atmosphere.",
    },
    {
      name: "Chandra Choodeswarar Temple",
      image: chandrachoodeswararImage,
      description:
        "Located atop a hill in Hosur, this temple dedicated to Lord Shiva is both a spiritual and architectural gem offering panoramic views of the city.",
    },
    {
      name: "Rayakottai Fort",
      image: rayakottaiFortImage,
      description:
        "A historical fort built during Tipu Sultan’s reign. It’s a popular spot for history lovers and trekkers, providing sweeping views of the green countryside.",
    },
    {
      name: "Melagiri Hills",
      image: melagiriImage,
      description:
        "A scenic range forming part of the Eastern Ghats, rich in biodiversity and perfect for trekking, photography, and eco-tourism adventures.",
    },
  ];

  // ✅ Temples & Heritage Sites
  const majorTemples = [
    {
      name: "Sri Kattu Veera Anjaneya Temple",
      description:
        "Dedicated to Lord Hanuman, famous for the ritual of tying coconuts with ropes for wishes. A must-visit for spiritual devotees.",
    },
    {
      name: "Arulmighu Sri Chandra Choodeswarar Temple",
      description:
        "Located atop Hosur hill, this temple of Lord Shiva (Chandra Chooda) is known for its beautiful Dravidian architecture and divine energy.",
    },
    {
      name: "Dakshina Tirupati Temple",
      description:
        "A southern counterpart of Tirupati Balaji Temple, dedicated to Lord Venkateswara, known for its grand Vaikunta Ekadasi celebrations.",
    },
  ];

  // ✅ Administrative divisions
  const divisionalDetails = [
    { division: "Krishnagiri", taluks: ["Krishnagiri", "Veppanapalli", "Kaveripattinam"] },
    { division: "Hosur", taluks: ["Hosur", "Denkanikottai", "Thally"] },
    { division: "Pochampalli", taluks: ["Pochampalli", "Uthangarai"] },
  ];

  // ✅ Educational institutions
  const educationInstitutions = [
    "Government Arts College, Krishnagiri",
    "Adhiyamaan College of Engineering, Hosur",
    "Perarignar Anna College of Arts and Science, Krishnagiri",
    "Er. Perumal Manimekalai College of Engineering, Hosur",
    "Sri Vijay Vidyalaya College of Arts and Science, Dharmapuri Road",
  ];

  return (
    <div className="krishnagiri-container">
      {/* Header */}
      <header className="krishnagiri-header">
        <h1>Discover Krishnagiri District</h1>
        <div className="krishnagiri-underline"></div>
        <p>The Gateway of Tamil Nadu - Hills, Heritage, and Harmony</p>
      </header>

      {/* Navbar */}
      <nav className="krishnagiri-nav">
        <a href="#history">History</a>
        <a href="#tourism">Tourism</a>
        <a href="#temples">Temples</a>
        <a href="#divisions">Divisions</a>
        <a href="#education">Education</a>
      </nav>

      {/* History Section */}
      <section id="history" className="krishnagiri-section">
        <h2>History of Krishnagiri</h2>
        <p className="krishnagiri-text">{historyText}</p>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="krishnagiri-section">
        <h2>Popular Tourist Attractions</h2>
        <div className="krishnagiri-grid">
          {tourismSpots.map((spot, i) => (
            <div key={i} className="krishnagiri-card glass-card">
              <img src={spot.image} alt={spot.name} />
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Temples Section */}
      <section id="temples" className="krishnagiri-section">
        <h2>Temples and Heritage Sites</h2>
        <div className="krishnagiri-grid">
          {majorTemples.map((temple, i) => (
            <div key={i} className="krishnagiri-card glass-card">
              <h3>{temple.name}</h3>
              <p>{temple.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="krishnagiri-section">
        <h2>Administrative Divisions</h2>
        <div className="krishnagiri-grid">
          {divisionalDetails.map((div, i) => (
            <div key={i} className="krishnagiri-card glass-card">
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
      <section id="education" className="krishnagiri-section">
        <h2>Major Educational Institutions</h2>
        <ul className="krishnagiri-education-list glass-card">
          {educationInstitutions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

