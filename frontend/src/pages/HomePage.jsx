import DistrictStorySection from '../components/DistrictStorySection';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <DistrictStorySection />

      <section className="content-section shell" id="about">
        <SectionHeading
          eyebrow="About"
          title="Built to preserve and promote Mazhavarnadu digitally"
          description="This project combines tourism discovery, heritage storytelling, and responsive web design in one application."
        />

        <div className="about-panel">
          <p>
            Smart Explorer Mazhavarnadu is designed as a modern entry point for people who want a quick, attractive,
            and mobile-friendly way to understand the region.
          </p>
          <p>
            The structure keeps the code reusable, the navigation simple, and the animation purposeful.
          </p>
        </div>
      </section>

      <section className="content-section shell" id="contact">
        <SectionHeading
          eyebrow="Contact"
          title="Keep the conversation going"
          description="Add a contact path that helps visitors ask for more information or start a collaboration."
        />

        <div className="contact-grid">
          <div className="contact-card">
            <span>Email</span>
            <a href="mailto:webdevmern6@gmail.com">webdevmern6@gmail.com</a>
          </div>
          <div className="contact-card">
            <span>Phone</span>
            <a href="tel:+916369799434">+91 63697 99434</a>
          </div>
          <div className="contact-card">
            <span>Location</span>
            <p>Poosaripatti, Kadyampatti, Salem, Tamil Nadu - 636305</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
