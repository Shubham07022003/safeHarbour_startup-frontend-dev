import { DoctorUI } from '../components';
import { Footer, Navbar } from '../components';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/ui/testimonials/Testimonials';
import CTA_Section from '../components/CTA-Section';
import  { useState } from 'react'; 

const Home = () => {
  const [showLanding, setShowLanding] = useState(true);
  const isLandingVisible = showLanding;
  const handleGetStarted = () => {
    setShowLanding(false);
  };
    
  if (isLandingVisible) {
    return <CTA_Section onGetStarted={handleGetStarted} />;
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow'>
        <div className='mt-20 md:mt-30'>
          <HeroSection />
        </div>
        <DoctorUI />
      </main>
    </div>
  );
};

export default Home;
