'use client';

import { getNicheConfig } from '@/src/config/niche-config';
import { useState } from 'react';

export default function Hero() {
  const config = getNicheConfig();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  
  const { hero } = config.content;
  const { branding } = config;

  const handleCTAClick = () => {
    // Open Vapi call modal or redirect to phone number
    if (config.vapi.phoneNumber) {
      window.location.href = `tel:${config.vapi.phoneNumber}`;
    } else {
      setIsCallModalOpen(true);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: hero.backgroundImage ? `url(${hero.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '--primary-color': branding.primaryColor,
        '--secondary-color': branding.secondaryColor,
        '--accent-color': branding.accentColor,
      } as React.CSSProperties}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
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
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: branding.fontFamily }}
        >
          {hero.headline}
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          {hero.subheadline}
        </p>
        
        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          style={{
            backgroundColor: branding.accentColor,
            color: '#ffffff'
          }}
        >
          📞 {hero.ctaText}
        </button>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
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
      
      {/* Call Modal */}
      {isCallModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Get Your Free Quote</h3>
            <p className="text-gray-600 mb-6">
              Call us now to speak with a {config.business.serviceType.toLowerCase()} expert!
            </p>
            <div className="flex gap-4">
              <a
                href={`tel:${config.vapi.phoneNumber}`}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-green-600 transition-colors"
              >
                📞 Call Now
              </a>
              <button
                onClick={() => setIsCallModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
