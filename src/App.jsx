// src/App.jsx
import { Routes, Route } from 'react-router-dom';
// Import your components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import HighlightsSection from './components/HighlightsSection';
import DistrictsSection from './components/DistrictsSection';
import Chatbot from './components/Chatbot';
import About from './pages/About'; // ✅ Import About page
import Salem from './pages/districts/Salem'; // ✅ Import Salem district page
import Dharmapuri from './pages/districts/Dharmapuri'; // ✅ Import Dharmapuri district page

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* ✅ Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <DistrictsSection />
                <HighlightsSection />
              </>
            }
          />

          {/* About Page Route */}
          <Route path="/about" element={<About />} />
          {/* District Page Route */}
          <Route path="/districts/salem" element={<Salem />} />
          {/* Dharmapuri District Page Route */}
          <Route path="/districts/dharmapuri" element={<Dharmapuri />} />

        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
