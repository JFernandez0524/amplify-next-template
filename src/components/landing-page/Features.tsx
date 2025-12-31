'use client';

import { getNicheConfig } from '@/src/config/niche-config';

export default function Features() {
  const config = getNicheConfig();
  const { features } = config.content;
  const { branding } = config;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: branding.primaryColor,
              fontFamily: branding.fontFamily 
            }}
          >
            Why Choose {config.business.name}?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {config.business.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto"
                style={{ backgroundColor: `${branding.primaryColor}20` }}
              >
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-xl font-semibold mb-4 text-center"
                style={{ color: branding.primaryColor }}
              >
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Service-specific additional features */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 
            className="text-2xl font-bold text-center mb-8"
            style={{ color: branding.primaryColor }}
          >
            Our {config.business.serviceType} Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {getProcessSteps(config.business.serviceType).map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {index + 1}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4" style={{ color: branding.primaryColor }}>
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8">
            Call now for your free estimate and same-day service!
          </p>
          <a
            href={`tel:${config.vapi.phoneNumber}`}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-white"
            style={{ backgroundColor: branding.accentColor }}
          >
            📞 Call {config.vapi.phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}

// Helper function to get process steps based on service type
function getProcessSteps(serviceType: string) {
  if (serviceType.toLowerCase().includes('junk')) {
    return [
      { title: 'Free Estimate', description: 'We assess your junk removal needs' },
      { title: 'Schedule Service', description: 'Pick a convenient time for removal' },
      { title: 'We Remove It', description: 'Our team handles all the heavy lifting' },
      { title: 'Clean & Dispose', description: 'We clean up and dispose responsibly' }
    ];
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return [
      { title: 'Free Consultation', description: 'We discuss your cleaning needs' },
      { title: 'Custom Plan', description: 'Create a cleaning plan that fits you' },
      { title: 'Professional Clean', description: 'Our team cleans to perfection' },
      { title: 'Quality Check', description: 'We ensure everything meets our standards' }
    ];
  }
  
  // Default process
  return [
    { title: 'Contact Us', description: 'Reach out for a free consultation' },
    { title: 'Get Quote', description: 'Receive a detailed service estimate' },
    { title: 'Schedule Service', description: 'Book at your convenience' },
    { title: 'Service Complete', description: 'Enjoy professional results' }
  ];
}
