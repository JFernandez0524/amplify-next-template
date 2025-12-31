import Hero from '@/src/components/landing-page/Hero';
import Features from '@/src/components/landing-page/Features';
import { getNicheConfig } from '@/src/config/niche-config';

export default function HomePage() {
  const config = getNicheConfig();

  return (
    <main>
      <Hero />
      <Features />
      
      {/* Additional sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8" style={{ color: config.branding.primaryColor }}>
            Serving Your Area with Professional {config.business.serviceType}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {config.business.description}. Contact us today to experience the difference 
            professional service makes.
          </p>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
            <p className="text-gray-600">
              We proudly serve the greater metropolitan area and surrounding communities. 
              Call to confirm service availability in your location.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
