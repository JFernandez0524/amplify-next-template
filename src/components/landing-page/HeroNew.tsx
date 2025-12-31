'use client';

import { getNicheConfig } from '@/src/config/niche-config';
import { FiPhone } from 'react-icons/fi';

export default function Hero() {
  const config = getNicheConfig();
  const { branding } = config;
  const phoneNumber = config.vapi.phoneNumber || '+1-973-384-1054';

  const handleCTAClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Service-specific content matching your existing style
  const getHeroContent = () => {
    if (config.business.serviceType.toLowerCase().includes('junk')) {
      return {
        headline: "We Make Junk Disappear & Your Home Shine ✨",
        subheadline: "Call us today for a **free quote** and enjoy a clutter-free home!",
        ctaText: "Call for a Free Quote"
      };
    }
    
    if (config.business.serviceType.toLowerCase().includes('cleaning')) {
      return {
        headline: "Professional House Cleaning That Sparkles ✨",
        subheadline: "Get your home professionally cleaned with our trusted cleaning service!",
        ctaText: "Book Your Cleaning"
      };
    }
    
    if (config.business.serviceType.toLowerCase().includes('notary')) {
      return {
        headline: "Mobile Notary Services at Your Location 📋",
        subheadline: "Professional notary services that come to you - home, office, or anywhere!",
        ctaText: "Book Notary Service"
      };
    }
    
    return config.content.hero;
  };

  const heroContent = getHeroContent();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Logo */}
        {branding.logoUrl && (
          <img 
            src={branding.logoUrl} 
            alt={config.business.name}
            className="h-16 mx-auto mb-8"
          />
        )}
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {heroContent.headline}
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          {heroContent.subheadline}
        </p>
        
        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg bg-orange-500 hover:bg-orange-600 text-white mb-6"
        >
          <FiPhone className="mr-2" />
          {heroContent.ctaText}
        </button>
        
        {/* Phone Number Display */}
        <div className="mb-12">
          <p className="text-lg text-gray-300">
            Available 7 days a week – Call us now!
          </p>
          <p className="text-2xl font-bold text-orange-400 mt-2">
            {phoneNumber}
          </p>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Licensed & Insured
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Same-Day Service
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Free Estimates
          </div>
        </div>
      </div>
    </section>
  );
}
