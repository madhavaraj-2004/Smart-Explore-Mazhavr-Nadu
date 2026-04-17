import { Link, Navigate, useParams } from 'react-router-dom';
import StreetView from '../components/StreetView';
import { attractionsById } from '../data/attractions360';

const StreetViewPage = () => {
  const { attractionId } = useParams();
  const attraction = attractionId ? attractionsById[attractionId] : null;

  if (!attraction) {
    return <Navigate to="/attractions" replace />;
  }

  return (
    <section className="streetview-page shell">
      <div className="streetview-head">
        <Link to="/attractions" className="streetview-back">
          Back to Attractions
        </Link>
        <h1>{attraction.name}</h1>
        <p>
          {attraction.district} - {attraction.latitude}, {attraction.longitude}
        </p>
      </div>

      <StreetView
        latitude={attraction.latitude}
        longitude={attraction.longitude}
        title={`${attraction.name} 360 street view`}
      />
    </section>
  );
};

export default StreetViewPage;