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
                "Mazhavar Nadu" (மழவர் நாடு) is a historic region of ancient Tamilnadu. This territory was ruled by
                the Mazhavar chieftains, who are famously mentioned in Sangam literature.
              </p>
              <p className="about-text">
                The region was renowned for its skilled warriors and benevolent rulers, such as{" "}
                <strong>Valvil Ori</strong>, who ruled the Kolli Hills (part of modern Namakkal) and was celebrated
                for his archery and generosity. Equally prominent was{" "}
                <strong>Adhiyaman Neduman Anji</strong> of <strong>Tagadur</strong> (present-day Dharmapuri),
                remembered for his valor, wisdom, and patronage of arts and Tamil literature.
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
              <div className="about-mapbox">
                <iframe
                  title="Mazhavarnadu Region Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391441.80762937074!2d77.615!3d11.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf0e8f1f67e85%3A0x2d6c0c1a2e4d9d5!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1730300000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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



