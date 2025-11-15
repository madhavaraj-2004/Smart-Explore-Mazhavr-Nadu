import React, { useState, useEffect } from "react";
import './Attraction.css';

/**
 * VirtualTour.jsx
 *
 * Props (optional):
 *  - tours: [ { id, title, location, thumbnail, image360, description } ]
 *
 * Usage:
 *  <VirtualTour tours={yourToursArray} />
 *
 * Notes:
 *  - image360 should be an equirectangular 360 image (jpg/png).
 *  - For best results use 4096x2048 or 8192x4096 images.
 */

const defaultTours = [
  {
    id: "yercaud",
    title: "Yercaud Lake (360°)",
    location: "Yercaud, Salem",
    thumbnail: "https://placehold.co/400x250/E69A8DFF/000000?text=Yercaud+360",
    image360:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef7a1a4?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&s=example", // replace with real 360
    description:
      "Panoramic view from Yercaud hills. Use drag to look around. Click VR on supported devices.",
  },
  {
    id: "hogenakkal",
    title: "Hogenakkal Falls (360°)",
    location: "Dharmapuri",
    thumbnail: "https://placehold.co/400x250/C19A6B/FFFFFF?text=Hogenakkal+360",
    image360:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
    description: "Hogenakkal river view. Great for waterfall panorama shots.",
  },
];

export default function VirtualTour({ tours = defaultTours }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    // When modal opens set A-Frame scene attributes if needed (autoplay, auto-rotate)
    // We will toggle 'rotation' via a-frame animation if autoplay enabled
    // Nothing extra required here — A-Frame is loaded globally by script tag
  }, [isOpen, autoplay]);

  const openTour = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
    // lock scroll
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
        <h2 className="vt-title">360° Virtual Tours</h2>
        <p className="vt-sub">Drag to look around. Tap the VR button for immersive view (if supported).</p>
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

      {/* Modal / Viewer */}
      {isOpen && (
        <div className="vt-modal" role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="vt-modal-inner">
            {/* left: viewer, right: info */}
            <div className="vt-viewer-wrap">
              {/* Controls bar */}
              <div className="vt-controls">
                <button className="vt-btn" onClick={() => setAutoplay((p) => !p)} aria-pressed={autoplay}>
                  {autoplay ? "Stop Auto-Spin" : "AutoSpin"}
                </button>
                <button className="vt-btn" onClick={prev}>Prev</button>
                <button className="vt-btn" onClick={next}>Next</button>
                <button className="vt-btn vt-close" onClick={closeTour}>Close</button>
              </div>

              {/* A-Frame scene */}
              <div className="vt-aframe-container">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <a-scene embedded vr-mode-ui="enabled: true" renderer="antialias: true" style={{ width: "100%", height: "100%" }}>
                  {/* optional auto-rotate: we implement auto-spin using animation on camera's rotation */}
                  <a-assets>
                    <img id={`img-${active.id}`} src={active.image360} alt={active.title} />
                  </a-assets>

                  {/* Sky with the 360 image */}
                  <a-sky src={`#img-${active.id}`} rotation="0 -90 0"></a-sky>

                  {/* Camera + Cursor (for desktop) */}
                  <a-entity id="cameraRig">
                    <a-entity camera look-controls position="0 1.6 0">
                      <a-entity
                        cursor="fuse: false; rayOrigin: mouse"
                        position="0 0 -1"
                        geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
                        material="color: #fff; shader: flat"
                      />
                    </a-entity>
                  </a-entity>

                  {/* if autoplay enabled, rotate the sky slowly using animation */}
                  {autoplay && (
                    <a-animation
                      attribute="rotation"
                      to="0 360 0"
                      dur="60000"
                      easing="linear"
                      repeat="indefinite"
                      begin="startSpin"
                      fill="forwards"
                      onPlay=""
                    />
                  )}
                </a-scene>
              </div>
            </div>

            <aside className="vt-info">
              <h3>{active.title}</h3>
              <p className="vt-loc">{active.location}</p>
              <p className="vt-desc">{active.description}</p>

              <div className="vt-meta">
                <div><strong>Image:</strong> {active.image360.split("/").pop().slice(0,40)}</div>
                <div><strong>Size:</strong> recommend 4096×2048 or higher</div>
              </div>

              <div className="vt-actions">
                <button className="vt-btn" onClick={() => { navigator.clipboard?.writeText(active.image360); alert("360 image URL copied"); }}>
                  Copy Image URL
                </button>
                <a className="vt-btn vt-link" href={active.image360} target="_blank" rel="noreferrer">Open Image</a>
              </div>

              <div className="vt-thumbs-title">Other Tours</div>
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

              <div className="vt-note">
                Tip: On mobile, rotate your phone. For immersive VR tap the VR button on the viewer.
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
