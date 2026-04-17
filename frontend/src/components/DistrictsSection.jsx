import DistrictCard from './DistrictCard';
import salemImage from '../assets/salem-district.jpg';
import dharmapuriImage from '../assets/dharmapuri-district.jpg';
import krishnagiriImage from '../assets/krishnagiri-district.jpg';
import namakkalImage from '../assets/namakkal-district.jpg';

const districts = [
    {
        name: "Salem",
        description: "Steel City known for its industrial heritage and Yercaud hills",
        imageUrl: salemImage,
        imageAlt: "Salem District"
    },
    {
        name: "Dharmapuri",
        description: "Land of waterfalls and ancient temples amidst lush greenery",
        imageUrl: dharmapuriImage,
        imageAlt: "Dharmapuri District"
    },
    {
        name: "Krishnagiri",
        description: "Mango country with historic forts and scenic landscapes",
        imageUrl: krishnagiriImage,
        imageAlt: "Krishnagiri District"
    },
    {
        name: "Namakkal",
        description: "Famous for its rock fort and rich cultural traditions",
        imageUrl: namakkalImage,
        imageAlt: "Namakkal District"
    }
];

const DistrictsSection = () => {
    return (
        <section className="districts-section">
            <div className="section-container">
                <h2 className="section-title">Explore Our Districts</h2>
                <div className="districts-grid">
                    {districts.map((district, index) => (
                        <DistrictCard
                            key={index}
                            name={district.name}
                            description={district.description}
                            imageUrl={district.imageUrl}
                            imageAlt={district.imageAlt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DistrictsSection;