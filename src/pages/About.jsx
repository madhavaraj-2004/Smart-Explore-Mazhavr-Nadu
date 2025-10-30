import React from "react"; import "./About.css"; // Import separate Tailwind CSS file export default function About() { return ( <div className="about-container"> {/* 1. Hero Section */} <div className="about-hero"> <h1 className="about-title">About Smart Explore</h1> <p className="about-subtitle"> Connecting the past, present, and future of Mazhavar Nadu through technology. </p> </div> {/* 2. Main Content */} <div className="about-main"> {/* Mission */} <section className="about-section"> <h2 className="about-heading">Our Mission</h2> <p className="about-text"> Our mission is to build an intelligent, interactive digital guide that connects tourists and locals to the rich cultural heritage, historical sites, and natural attractions of the Mazhavar Nadu region. We aim to make exploration easy, educational, and engaging by leveraging AI, interactive maps, and community stories. </p> </section> {/* What is Mazhavar Nadu */} <section className="about-card"> <h2 className="about-heading">What is Mazhavar Nadu?</h2> <div className="about-flex"> <div className="about-textblock"> <p className="about-text"> "Mazhavar Nadu" (மழவர் நாடு) is a historic region of ancient Tamilakam. This territory was ruled by the Mazhavar chieftains, who are famously mentioned in Sangam literature. </p> <p className="about-text"> The region was renowned for its skilled warriors and benevolent rulers, such as{" "} <strong>Valvil Ori</strong>, who ruled the Kolli Hills (part of modern Namakkal) and was celebrated for his archery and generosity. </p> <p className="about-text">Today, this ancient land corresponds to the modern districts of:</p> <ul className="about-list"> <li><span className="highlight">Salem:</span> The steel city with a rich history and gateway to Yercaud.</li> <li><span className="highlight">Namakkal:</span> Known for its rock fort, Anjaneyar temple, and Kolli Hills.</li> <li><span className="highlight">Dharmapuri:</span> Home to the magnificent Hogenakkal Falls.</li> <li><span className="highlight">Krishnagiri:</span> A land of historic forts and the massive KRP Dam.</li> </ul> </div> <div className="about-map"> {/* You can later replace this div with your map image */} <div className="about-mapbox"> <p className="map-placeholder">[Map or Image Coming Soon]</p> </div> </div> </div> </section> {/* Team Section */} <section className="about-section"> <h2 className="about-heading">Meet the Team</h2> <p className="about-text text-center"> We are passionate students and developers dedicated to preserving and promoting our local heritage. This project is our contribution to the land of our ancestors. </p> </section> </div> </div> ); } About.jsx code ithuku css kududaimport React from "react"; import "./About.css"; // Import separate Tailwind CSS file export default function About() { return ( <div className="about-container"> {/* 1. Hero Section */} <div className="about-hero"> <h1 className="about-title">About Smart Explore</h1> <p className="about-subtitle"> Connecting the past, present, and future of Mazhavar Nadu through technology. </p> </div> {/* 2. Main Content */} <div className="about-main"> {/* Mission */} <section className="about-section"> <h2 className="about-heading">Our Mission</h2> <p className="about-text"> Our mission is to build an intelligent, interactive digital guide that connects tourists and locals to the rich cultural heritage, historical sites, and natural attractions of the Mazhavar Nadu region. We aim to make exploration easy, educational, and engaging by leveraging AI, interactive maps, and community stories. </p> </section> {/* What is Mazhavar Nadu */} <section className="about-card"> <h2 className="about-heading">What is Mazhavar Nadu?</h2> <div className="about-flex"> <div className="about-textblock"> <p className="about-text"> "Mazhavar Nadu" (மழவர் நாடு) is a historic region of ancient Tamilakam. This territory was ruled by the Mazhavar chieftains, who are famously mentioned in Sangam literature. </p> <p className="about-text"> The region was renowned for its skilled warriors and benevolent rulers, such as{" "} <strong>Valvil Ori</strong>, who ruled the Kolli Hills (part of modern Namakkal) and was celebrated for his archery and generosity. </p> <p className="about-text">Today, this ancient land corresponds to the modern districts of:</p> <ul className="about-list"> <li><span className="highlight">Salem:</span> The steel city with a rich history and gateway to Yercaud.</li> <li><span className="highlight">Namakkal:</span> Known for its rock fort, Anjaneyar temple, and Kolli Hills.</li> <li><span className="highlight">Dharmapuri:</span> Home to the magnificent Hogenakkal Falls.</li> <li><span className="highlight">Krishnagiri:</span> A land of historic forts and the massive KRP Dam.</li> </ul> </div> <div className="about-map"> {/* You can later replace this div with your map image */} <div className="about-mapbox"> <p className="map-placeholder">[Map or Image Coming Soon]</p> </div> </div> </div> </section> {/* Team Section */} <section className="about-section"> <h2 className="about-heading">Meet the Team</h2> <p className="about-text text-center"> We are passionate students and developers dedicated to preserving and promoting our local heritage. This project is our contribution to the land of our ancestors. </p> </section> </div> </div> ); } About.jsx code ithuku css kududaimport React from "react";
import "./About.css"; // Import separate Tailwind CSS file

export default function About() {
  return (
    <div className="about-container">
      {/* 1. Hero Section */}
      <div className="about-hero">
        <h1 className="about-title">About Smart Explore</h1>
        <p className="about-subtitle">
          Connecting the past, present, and future of Mazhavar Nadu through technology.
        </p>
      </div>

      {/* 2. Main Content */}
      <div className="about-main">
        {/* Mission */}
        <section className="about-section">
          <h2 className="about-heading">Our Mission</h2>
          <p className="about-text">
            Our mission is to build an intelligent, interactive digital guide that connects tourists and locals
            to the rich cultural heritage, historical sites, and natural attractions of the Mazhavar Nadu region.
            We aim to make exploration easy, educational, and engaging by leveraging AI, interactive maps, and
            community stories.
          </p>
        </section>

        {/* What is Mazhavar Nadu */}
        <section className="about-card">
          <h2 className="about-heading">What is Mazhavar Nadu?</h2>
          <div className="about-flex">
            <div className="about-textblock">
              <p className="about-text">
                "Mazhavar Nadu" (மழவர் நாடு) is a historic region of ancient Tamilakam. This territory was ruled by
                the Mazhavar chieftains, who are famously mentioned in Sangam literature.
              </p>
              <p className="about-text">
                The region was renowned for its skilled warriors and benevolent rulers, such as{" "}
                <strong>Valvil Ori</strong>, who ruled the Kolli Hills (part of modern Namakkal) and was celebrated
                for his archery and generosity.
              </p>
              <p className="about-text">Today, this ancient land corresponds to the modern districts of:</p>
              <ul className="about-list">
                <li><span className="highlight">Salem:</span> The steel city with a rich history and gateway to Yercaud.</li>
                <li><span className="highlight">Namakkal:</span> Known for its rock fort, Anjaneyar temple, and Kolli Hills.</li>
                <li><span className="highlight">Dharmapuri:</span> Home to the magnificent Hogenakkal Falls.</li>
                <li><span className="highlight">Krishnagiri:</span> A land of historic forts and the massive KRP Dam.</li>
              </ul>
            </div>
            <div className="about-map">
              {/* You can later replace this div with your map image */}
              <div className="about-mapbox">
                <p className="map-placeholder">[Map or Image Coming Soon]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-section">
          <h2 className="about-heading">Meet the Team</h2>
          <p className="about-text text-center">
            We are passionate students and developers dedicated to preserving and promoting
            our local heritage. This project is our contribution to the land of our ancestors.
          </p>
        </section>
      </div>
    </div>
  );
}



