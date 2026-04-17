import { Link } from 'react-router-dom';

const socialLinks = [
  {
    label: 'GitHub profile',
    href: 'https://github.com/madhavaraj-2004',
    title: 'GitHub',
  },
  {
    label: 'Instagram profile',
    href: 'https://www.instagram.com/madhav_0010?igsh=cWFvMDBwNGh1ODNu',
    title: 'Instagram',
  },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.8-.25.8-.56v-2.1c-3.26.71-3.95-1.4-3.95-1.4-.53-1.34-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.8 2.74 1.28 3.4.98.1-.76.4-1.28.72-1.57-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.32 1.2-3.14-.12-.3-.53-1.5.12-3.12 0 0 .98-.31 3.2 1.2a11.1 11.1 0 0 1 5.82 0c2.22-1.51 3.2-1.2 3.2-1.2.65 1.62.24 2.82.12 3.12.74.82 1.2 1.86 1.2 3.14 0 4.49-2.74 5.48-5.35 5.78.41.35.78 1.05.78 2.12v3.14c0 .31.22.67.81.56A11.5 11.5 0 0 0 12 .5Z" fill="currentColor" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7.2.5h9.6A6.7 6.7 0 0 1 23.5 7.2v9.6a6.7 6.7 0 0 1-6.7 6.7H7.2A6.7 6.7 0 0 1 .5 16.8V7.2A6.7 6.7 0 0 1 7.2.5Zm0 2A4.7 4.7 0 0 0 2.5 7.2v9.6a4.7 4.7 0 0 0 4.7 4.7h9.6a4.7 4.7 0 0 0 4.7-4.7V7.2a4.7 4.7 0 0 0-4.7-4.7H7.2Zm9.87 1.86a1.02 1.02 0 1 1 0 2.04 1.02 1.02 0 0 1 0-2.04Zm-4.47 1.04a5.94 5.94 0 1 1 0 11.88 5.94 5.94 0 0 1 0-11.88Zm0 2a3.94 3.94 0 1 0 0 7.88 3.94 3.94 0 0 0 0-7.88Z" fill="currentColor" />
  </svg>
);

const Footer = ({ links }) => {
  return (
    <footer className="brand-footer">
      <div className="brand-footer__glow brand-footer__glow--one" aria-hidden="true" />
      <div className="brand-footer__glow brand-footer__glow--two" aria-hidden="true" />

      <div className="shell brand-footer__shell">
        <div className="brand-footer__intro">
          <p className="brand-footer__eyebrow">Smart Explorer Mazhavarnadu</p>
          <h2>Premium travel storytelling for Salem, Dharmapuri, Krishnagiri, and Namakkal.</h2>
          <p>
            Developed by <strong>Mr. P. Madhavaraj M.Sc.,</strong> with a focus on a polished, mobile-ready tourism experience.
          </p>
        </div>

        <div className="brand-footer__links">
          <div className="brand-footer__quick-links">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="brand-footer__pill">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="brand-footer__socials" aria-label="Developer social links">
            {socialLinks.map((item) => (
              <a key={item.label} className="brand-footer__social-link" href={item.href} target="_blank" rel="noreferrer">
                <span className="brand-footer__social-icon" aria-hidden="true">
                  {item.title === 'GitHub' ? <GitHubIcon /> : <InstagramIcon />}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="brand-footer__bottom">
          <span>Built for immersive tourism discovery.</span>
          <span>© 2026 Smart Explorer Mazhavarnadu.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
