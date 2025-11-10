import React from "react";
import "./Salem.css";

// Local image imports
import yercaudImage from "./district_asset/yercaud.jpg";
import killiyurImage from "./district_asset/killiyurfalls.jpg";
import kurumbapattiImage from "./district_asset/kurumbapatti.jpg";
import metturdamImage from "./district_asset/metturdam.jpg";
import muttalImage from "./district_asset/muttalfalls.jpg";
import sankagiriImage from "./district_asset/sankagirifort.jpg";


export default function Salem() {
  //  History content
  const historyText =
    "Salem, historically a central part of the ancient Mazhavar Nadu region, boasts a deep cultural heritage. Its name is believed to have evolved from 'Cheralam' or 'Sailam' (hill country). The region was under the rule of various dynasties, including the Cheras and Cholas. A notable figure associated with this area is the chieftain Valvil Ori, a legendary archer celebrated in Sangam literature for his valor and patronage of the arts. Salem served as a significant administrative and trade hub, particularly known for its textile industry and mineral wealth (magnesite and iron ore) through the centuries.";

  // Tourism spots (local images)
  const tourismSpots = [
    {
      name: "Yercaud",
      image: yercaudImage,
      description:
        "A beautiful hill station in the Shevaroy Hills, known for pleasant weather, coffee plantations, Big Lake, and scenic viewpoints.",
    },
    {
      name: "Kiliyur Falls",
      image: killiyurImage,
      description:
        "A 300-foot waterfall in Yercaud, best visited after the monsoon season, offering a picturesque and refreshing view.",
    },
    {
      name: "Mettur Dam",
      image: metturdamImage,
      description:
        "One of the largest dams in India, built across the Kaveri River. It provides irrigation and hydroelectric power to the region.",
    },
    {
      name: "Kurumbapatti Zoological Park",
      image: kurumbapattiImage,
      description:
        "A mini-zoo near Salem city, home to various species of birds and animals — a perfect destination for family outings.",
    },
    {
      name: "Muttal Falls",
      image: muttalImage,
      description:
        "Located near Muttal village, this serene waterfall is surrounded by dense greenery and rocky terrain — a hidden natural gem for visitors.",
    },
    {
      name: "Sankagiri Fort",
      image: sankagiriImage,
      description:
        "An ancient fort built during the Vijayanagara Empire, later used by the British. It offers historic charm and great hilltop views.",
    },
  ];

  // ✅ Major temples
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

  // ✅ Administrative divisions
  const divisionalDetails = [
    { division: "Salem", taluks: ["Salem North", "Salem South", "Salem West"] },
    { division: "Attur", taluks: ["Attur", "Gangavalli", "Pethanaickenpalayam"] },
    { division: "Mettur", taluks: ["Mettur", "Kolathur"] },
    { division: "Omalur", taluks: ["Omalur", "Tharamangalam", "Kadayampatti"] },
    { division: "Sankari", taluks: ["Sankari", "Edappadi"] },
  ];

  // ✅ Educational institutions
  const educationInstitutions = [
    "Periyar University (State University)",
    "Government Arts College (Autonomous), Salem-7",
    "Government Engineering College, Salem",
    "Salem Medical College (Mohan Kumaramangalam Medical College)",
    "Sona College of Technology (Autonomous)",
    "Vinayaka Missions Research Foundation (Deemed University)",
    "AVS College of Arts and Science (Autonomous)",
  ];

  // ✅ Page structure JSX
  return (
    <div className="salem-container">
      {/* Header */}
      <header className="salem-header">
        <h1>Discover Salem District</h1>
        <div className="underline"></div>
        <p>The Mango City and gateway to the historic Mazhavar Nadu region</p>
      </header>

      {/* Navbar */}
      <nav className="salem-nav">
        <a href="#history">History</a>
        <a href="#tourism">Tourism</a>
        <a href="#temples">Temples</a>
        <a href="#divisions">Divisions</a>
        <a href="#education">Education</a>
      </nav>

      {/* History Section */}
      <section id="history" className="salem-section">
        <h2>History of Salem</h2>
        <p className="salem-text">{historyText}</p>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="salem-section">
        <h2>Popular Tourist Places</h2>
        <div className="salem-grid">
          {tourismSpots.map((spot, i) => (
            <div key={i} className="salem-card glass-card">
              <img src={spot.image} alt={spot.name} />
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Temples Section */}
      <section id="temples" className="salem-section">
        <h2>Major Temples in Salem</h2>
        <div className="salem-grid">
          {majorTemples.map((temple, i) => (
            <div key={i} className="salem-card glass-card">
              <h3>{temple.name}</h3>
              <p>{temple.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="salem-section">
        <h2>Administrative Divisions</h2>
        <div className="salem-grid">
          {divisionalDetails.map((div, i) => (
            <div key={i} className="salem-card glass-card">
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
      <section id="education" className="salem-section">
        <h2>Major Educational Institutions</h2>
        <ul className="education-list glass-card">
          {educationInstitutions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
