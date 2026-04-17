import { useMemo, useState } from 'react';

const StreetView = ({ latitude, longitude, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl = useMemo(
    () =>
      `https://maps.google.com/maps?q=&layer=c&cbll=${latitude},${longitude}&cbp=11,0,0,0,0&z=18&output=embed`,
    [latitude, longitude],
  );

  return (
    <div className="streetview-wrap">
      {isLoading ? <div className="streetview-loading">Loading 360 view...</div> : null}
      <iframe
        title={title}
        src={embedUrl}
        className="streetview-iframe"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default StreetView;