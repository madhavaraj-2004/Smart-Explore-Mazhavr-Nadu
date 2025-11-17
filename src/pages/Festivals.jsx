import React, { useState, useEffect } from "react";
import "./Festivals.css";

// ===============================
// Festival Data (Single Page)
// ===============================
const festivalData = [
  {
    name: "Salem",
    sections: [
      {
        title: "Religious and Cultural Festivals",
        items: [
          "Kottai Mariamman Temple Festival: A major week-long religious celebration in July/August, culminating in a fire-walking ceremony.",
          "Yercaud Summer Festival: A prominent event in Yercaud in the last week of May, featuring flower shows, dog shows, and boat races.",
          "Malayali Pilgrim Festival: An annual event at the Servarayan Kaveri Amman Temple in Yercaud, attracting thousands in May.",
          "Adiperukku Festival: Celebrated every year in August in Mettur.",
          "Salem Sangamam: A grand cultural festival celebrating Tamil Nadu heritage through dance, music, drama, and folk arts."
        ]
      },
      {
        title: "Other Large-Scale Events",
        items: [
          "Great Indian Food Festival: A three-day event with food, music, and DJ nights.",
          "Diwali Branded Expo: A large shopping event held around Diwali.",
          "Kabaddi Battle: A major annual tournament with significant cash prizes.",
          "Salem Mega Fashion and Lifestyle Exhibition: An exhibition bringing designers from across India.",
          "Mega Medical Camp: Large-scale health camps."
        ]
      }
    ]
  },
  {
    name: "Dharmapuri",
    sections: [
      {
        title: "Major Annual Festivals and Events",
        items: [
          "Thai Pongal: The most cherished and widely celebrated harvest festival in mid-January.",
          "Aadi Perukku (Aadi-18): Attracts large crowds to Hogenakkal and Theerthamalai areas in July-August.",
          "Theerthamalai Temple Festivals: Hosts the 10-day Masi Brahmotsavam (Feb-March).",
          "Dharmapuri Book Festival: An annual multi-day cultural event to promote reading."
        ]
      },
      {
        title: "Other Notable Events",
        items: [
          "Millet Festival: A zonal-level festival to promote farmers.",
          "Mega Job Fairs: District administration conducts regular 'mega job melas'."
        ]
      }
    ]
  },
  {
    name: "Krishnagiri",
    sections: [
      {
        title: "Major Festivals",
        items: [
          "Mangani Thiruvizha (Mango Festival): A 23-day celebration in June focused on mangoes.",
          "Denkanikottai Annual Car Festival: Held in March or April for the Battarayaswamy temple.",
          "Chandira Choodeswarar Temple Car Festival: A major car festival in March in Hosur.",
          "Aadiperukku Festival: Celebrated at the Krishnagiri Dam honoring the water goddess.",
          "Krishnagiri Navratri Festival: A grand spiritual event in October at Krishnagiri Dham."
        ]
      }
    ]
  },
  {
    name: "Namakkal",
    sections: [
      {
        title: "Major Festivals",
        items: [
          "Valvil Ori Festival: Celebrated in Kolli Hills in August, honoring the legendary warrior Valvil Ori.",
          "Narasimhaswamy Temple Car Festival: Occurs in Namakkal in March/April, with a grand procession."
        ]
      },
      {
        title: "Other Festivals and Events",
        items: [
          "Adi Month Festivals: Celebrated at Arapaleeshwarar Temple (Aadi Pirappu, Aadi Perukku, Aadi Pooram).",
          "Namakkal Mega Book Fair: An annual book fair attracting thousands.",
          "Hanuman Jeyanthi: A major religious event."
        ]
      }
    ]
  }
];

// ===============================
// Slider Images (Updated + Safe URLs)
// ===============================
const sliderImages = [
  "https://placehold.co/1200x400/a35212/white?text=Yercaud%20Summer%20Festival",
  "https://placehold.co/1200x400/8c441b/white?text=Kottai%20Mariamman%20Festival",
  "https://placehold.co/1200x400/b86a2d/white?text=Valvil%20Ori%20Festival",
  "https://placehold.co/1200x400/d1823f/white?text=Mangani%20Thiruvizha",
  "https://placehold.co/1200x400/e6994b/white?text=Adhiyaman%20Kottai%20Festival"  // 👈 Fixed URL Encoding
];

export default function Festivals() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expanded, setExpanded] = useState(null);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Toggle Dark Theme
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
  }

  return (
    <div className="festival-page tamil-font">
      
      {/* Dark Mode Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>🌓 Theme</button>

      {/* Image Slider */}
      <div className="slider-container">
        <div
          className="slider-inner"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {sliderImages.map((img, index) => (
            <img
              key={index}
              className="slider-img"
              src={img}
              alt={`Festival slide ${index + 1}`}
              onError={(e) => (e.target.src = "https://placehold.co/1200x400/000/fff?text=Image+Unavailable")}
            />
          ))}
        </div>
      </div>

      {/* Heading */}
      <h1 className="festival-title">Festivals of Mazhavar Naadu</h1>
      <p className="festival-subtext">
        Explore vibrant cultural celebrations of Salem, Dharmapuri, Krishnagiri & Namakkal.
      </p>

      {/* District Cards */}
      <div className="festival-grid">
        {festivalData.map((district, index) => (
          <div
            key={index}
            className={`card ${expanded === index ? "active" : ""}`}
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <h2 className="district-name">{district.name}</h2>

            {district.sections.map((section, secIndex) => (
              <div key={secIndex} className="section-block">
                <h3 className="section-title">{section.title}</h3>
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
