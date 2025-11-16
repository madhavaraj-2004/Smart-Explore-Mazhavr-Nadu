import React, { useState, useEffect } from "react";
import "./Attraction.css";

const defaultTours = [
  // ======== SALEM ========
  {
    id: "salem360",
    title: "Salem District 360° View",
    location: "Salem",
    district: "Salem",
    thumbnail: "https://placehold.co/400x250/FF8C42/000?text=Salem+360",
    image360: "your_salem_360_image_url_here",
    description: "Panoramic VR experience of Salem landscapes, hills & heritage spots."
  },

  // ======== DHARMAPURI ========
  {
    id: "dharmapuri360",
    title: "Dharmapuri District 360° View",
    location: "Dharmapuri",
    district: "Dharmapuri",
    thumbnail: "https://placehold.co/400x250/7A5AF5/FFFFFF?text=Dharmapuri+360",
    image360: "your_dharmapuri_360_image_url_here",
    description: "Experience waterfalls, forests, and cultural scenery in VR mode."
  },

  // ======== KRISHNAGIRI ========
  {
    id: "krishnagiri360",
    title: "Krishnagiri District 360° View",
    location: "Krishnagiri",
    district: "Krishnagiri",
    thumbnail: "https://placehold.co/400x250/4DB6AC/000?text=Krishnagiri+360",
    image360: "your_krishnagiri_360_image_url_here",
    description: "Green valley views, lake, parks & hilltop experience in 360°."
  },

  // ======== NAMAKKAL ========
  {
    id: "namakkal360",
    title: "Namakkal District 360° View",
    location: "Namakkal",
    district: "Namakkal",
    thumbnail: "https://placehold.co/400x250/EF5350/FFFFFF?text=Namakkal+360",
    image360: "your_namakkal_360_image_url_here",
    description: "Immersive VR view around Kolli Hills and Namakkal Fort regions."
  }
];

export default function VirtualTour({ tours = defaultTours }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {}, [isOpen, autoplay]);

  const openTour = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeTour = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const prev = () => setActiveIndex((s) => (s - 1 + tours.length) % tours.length);
  const next = () => setActiveIndex((s) => (s + 1) % tours.length);

  const active = tours[activeIndex];

  return (
    <div className="vt-page">
      <div className="vt-header">
        <h2 className="vt-title">360° Virtual District Tours</h2>
        <p className="vt-sub">Drag to explore. Enter VR for immersive view.</p>
      </div>

      <div className="vt-grid">
        {tours.map((t, idx) => (
          <div key={t.id} className="vt-card" onClick={() => openTour(idx)} role="button" tabIndex={0}>
            <img src={t.thumbnail} alt={t.title} className="vt-thumb" />
            <div className="vt-card-body">
              <h3>{t.title}</h3>
              <p className="vt-loc">{t.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Viewer Modal */}
      {isOpen && (
        <div className="vt-modal" role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="vt-modal-inner">
            <div className="vt-viewer-wrap">

              {/* Controls */}
              <div className="vt-controls">
                <button className="vt-btn" onClick={() => setAutoplay((p) => !p)}>
                  {autoplay ? "Stop Auto-Spin" : "AutoSpin"}
                </button>
                <button className="vt-btn" onClick={prev}>Prev</button>
                <button className="vt-btn" onClick={next}>Next</button>
                <button className="vt-btn vt-close" onClick={closeTour}>Close</button>
              </div>

              {/* A-Frame Viewer */}
              <div className="vt-aframe-container">
                <a-scene embedded vr-mode-ui="enabled: true" renderer="antialias: true" style={{ width: "100%", height: "100%" }}>
                  <a-assets>
                    <img id={`img-${active.id}`} src={active.image360} alt={active.title} />
                  </a-assets>
                  <a-sky src={`#img-${active.id}`} rotation="0 -90 0"></a-sky>
                  
                  <a-entity id="cameraRig">
                    <a-entity camera look-controls position="0 1.6 0">
                      <a-entity
                        cursor="rayOrigin: mouse"
                        geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
                        material="color: white; shader: flat"
                      />
                    </a-entity>
                  </a-entity>

                  {autoplay && (
                    <a-animation attribute="rotation" to="0 360 0" dur="70000" easing="linear" repeat="indefinite" />
                  )}
                </a-scene>
              </div>
            </div>

            {/* Info Sidebar */}
            <aside className="vt-info">
              <h3>{active.title}</h3>
              <p className="vt-loc">{active.location}</p>
              <p className="vt-desc">{active.description}</p>

              <div className="vt-meta">
                <div><b>Image:</b> {active.image360}</div>
                <div><b>Resolution:</b> Recommended 4096×2048 or above</div>
              </div>

              <div className="vt-actions">
                <button
                  className="vt-btn"
                  onClick={() => { navigator.clipboard?.writeText(active.image360); alert("Copied!"); }}
                >
                  Copy Image URL
                </button>
                <a className="vt-btn vt-link" href={active.image360} target="_blank" rel="noreferrer">Open Image</a>
              </div>

              <div className="vt-thumbs-title">Quick Select</div>
              <div className="vt-thumb-row">
                {tours.map((t, i) => (
                  <img
                    key={t.id}
                    src={t.thumbnail}
                    alt={t.title}
                    className={`vt-thumb-small ${i === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>

              <div className="vt-note">Rotate device for wide VR mode.</div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
