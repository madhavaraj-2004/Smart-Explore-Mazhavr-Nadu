import { useEffect, useMemo, useState } from 'react';
import './Attraction.css';
import { fetchDistrictVideos } from '../api/videosApi';

const DISTRICTS = ['Salem', 'Dharmapuri', 'Krishnagiri', 'Namakkal'];

function toEmbedUrl(url) {
  if (!url) {
    return '';
  }

  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i,
    /[?&]v=([A-Za-z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return '';
}

function toYoutubeId(url) {
  if (!url) {
    return '';
  }

  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i,
    /[?&]v=([A-Za-z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return '';
}

function getPreviewImage(videoId) {
  if (!videoId) {
    return '';
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function Attraction() {
  const [videos, setVideos] = useState(DISTRICTS.map((district) => ({ district, video_url: '' })));
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchDistrictVideos();
        if (mounted) {
          setVideos(data);
        }
      } catch {
        if (mounted) {
          setVideos(DISTRICTS.map((district) => ({ district, video_url: '' })));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadVideos();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (videos.length <= 1 || isModalOpen) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % videos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isModalOpen, videos.length]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const current = videos[activeIndex] || videos[0] || { district: 'District Video', video_url: '' };
  const currentEmbedUrl = useMemo(() => toEmbedUrl(current.video_url), [current.video_url]);
  const currentVideoId = useMemo(() => toYoutubeId(current.video_url), [current.video_url]);

  const activeCards = useMemo(
    () =>
      videos.map((video, index) => {
        const videoId = toYoutubeId(video.video_url);
        return {
          ...video,
          videoId,
          previewImage: getPreviewImage(videoId),
          isActive: index === activeIndex,
        };
      }),
    [activeIndex, videos],
  );

  const goNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % videos.length);
  };

  const goPrev = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + videos.length) % videos.length);
  };

  const openVideo = (video) => {
    const videoId = toYoutubeId(video.video_url);
    const embedUrl = toEmbedUrl(video.video_url);

    if (!embedUrl) {
      return;
    }

    setSelectedVideo({
      district: video.district,
      videoId,
      embedUrl,
    });
    setIsModalOpen(true);
  };

  const closeVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="vt-page shell">
      <div className="vt-header">
        <h2 className="vt-title">District Video Explorer</h2>
        <p className="vt-sub">Watch curated district highlights that admins can update anytime from the dashboard.</p>
      </div>

      <div className="vt-immersive-wrap">
        {loading ? (
          <div className="vt-3d-loading">Loading district videos...</div>
        ) : (
          <article className="video-slider" aria-live="polite">
            <div className="video-slider__overlay" aria-hidden="true" />

            <div key={current.district} className="video-slider__stage video-slider__stage--fade">
              {currentEmbedUrl || currentVideoId ? (
                <button type="button" className="video-slider__preview" onClick={() => openVideo(current)} aria-label={`Play ${current.district} district video`}>
                  {currentVideoId ? (
                    <img className="video-slider__poster" src={getPreviewImage(currentVideoId)} alt={`${current.district} video preview`} />
                  ) : (
                    <div className="video-slider__empty">No video configured for {current.district} yet.</div>
                  )}

                  <span className="video-slider__play-chip" aria-hidden="true">
                    <span className="video-slider__play-icon">▶</span>
                    Play
                  </span>
                </button>
              ) : (
                <div className="video-slider__empty">No video configured for {current.district} yet.</div>
              )}
            </div>

            <div className="video-slider__district-tag">{current.district}</div>

            <div className="video-slider__dots" aria-label="District video selector">
              {activeCards.map((video, index) => (
                <button
                  key={video.district}
                  type="button"
                  className={`video-slider__dot${index === activeIndex ? ' video-slider__dot--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${video.district} preview`}
                  aria-pressed={index === activeIndex}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button type="button" className="video-slider__nav video-slider__nav--prev" onClick={goPrev} aria-label="Previous district video">
              ‹
            </button>
            <button type="button" className="video-slider__nav video-slider__nav--next" onClick={goNext} aria-label="Next district video">
              ›
            </button>
          </article>
        )}
      </div>

      {isModalOpen && selectedVideo ? (
        <div className="video-modal" role="presentation" onClick={closeVideo}>
          <div className="video-modal__panel" role="dialog" aria-modal="true" aria-label={`${selectedVideo.district} district video`} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="video-modal__close" onClick={closeVideo} aria-label="Close video modal">
              ×
            </button>

            <div className="video-modal__header">
              <h3>{selectedVideo.district}</h3>
              <p>Playing district preview</p>
            </div>

            <div className="video-modal__frame-wrap">
              <iframe
                className="video-modal__frame"
                src={`${selectedVideo.embedUrl}${selectedVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                title={`${selectedVideo.district} district video player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
