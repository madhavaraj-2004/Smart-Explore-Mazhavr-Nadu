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
import Salem from "./pages/districts/Salem";

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
          <Route path="/salem" element={<Salem />} />

        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
