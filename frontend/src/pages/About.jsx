import './About.css';
import developerProfile from '../assets/Madhav.png';

const districtHighlights = [
  {
    title: 'Salem',
    text: 'Gateway landscapes, Yercaud viewpoints, and a fast-moving urban identity.',
  },
  {
    title: 'Dharmapuri',
    text: 'River corridors, Hogenakkal energy, and rugged natural drama.',
  },
  {
    title: 'Krishnagiri',
    text: 'Historic forts, reservoirs, and travel routes shaped by the hill terrain.',
  },
  {
    title: 'Namakkal',
    text: 'Rock fort silhouettes, temple culture, and the legacy of Kolli Hills.',
  },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero shell">
        <p className="about-eyebrow">About Smart Explorer Mazhavarnadu</p>
        <h1>Modern travel storytelling for Mazhavarnadu</h1>
        <p className="about-hero-copy">
          A premium digital guide that blends heritage, AI, and visual discovery across Salem,
          Dharmapuri, Krishnagiri, and Namakkal.
        </p>
      </section>

      <section className="about-profile shell">
        <article className="about-profile-card">
          <div className="about-profile-media">
            <div className="about-profile-glow" aria-hidden="true" />
            <div className="about-profile-ring">
              <img src={developerProfile} alt="Mr. P. Madhavaraj" className="about-profile-image" />
            </div>
          </div>

          <div className="about-profile-copy">
            <p className="about-profile-label">Developer Profile</p>
            <h2>Mr. P. Madhavaraj M.Sc.,</h2>
            <p className="about-profile-role">AI Developer / Full Stack Developer</p>
            <p className="about-profile-bio">
              Full Stack Web Developer skilled in the MERN stack (MongoDB, Express.js,
              React.js, Node.js), building scalable and responsive web applications with
              practical AI integration.
            </p>

            <div className="about-profile-pills">
              <span>Education Based Apps</span>
              <span>MERN Stack Development</span>
              <span>Python and JavaScript</span>
            </div>
          </div>
        </article>
      </section>

      <section className="about-grid shell">
        <article className="about-card about-card--mission">
          <p className="about-card-label">Mission</p>
          <h3>Make exploration feel premium, immediate, and meaningful.</h3>
          <p>
            Smart Explorer Mazhavarnadu is designed as a modern discovery platform for locals,
            students, and travelers who want fast access to district stories, scenic previews,
            and AI-assisted guidance.
          </p>
        </article>

        <article className="about-card about-card--region">
          <p className="about-card-label">Region</p>
          <h3>Mazhavar Nadu</h3>
          <p>
            This app presents the cultural memory of the region through a contemporary interface,
            connecting heritage narratives with district-level travel content.
          </p>
        </article>
      </section>

      <section className="about-districts shell">
        <div className="about-section-head">
          <p className="about-card-label">District Snapshot</p>
          <h3>Four districts, one connected travel story</h3>
        </div>

        <div className="about-district-grid">
          {districtHighlights.map((item) => (
            <article key={item.title} className="about-district-card">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
