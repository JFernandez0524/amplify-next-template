'use client';

interface ServiceTrackingProps {
  opportunities: any[];
  config: any;
}

export default function ServiceTracking({ opportunities, config }: ServiceTrackingProps) {
  const upcomingServices = opportunities.filter(opp => 
    opp.stage === 'scheduled' && 
    opp.serviceDate && 
    new Date(opp.serviceDate) >= new Date()
  );

  const getTrackingInfo = (serviceType: string) => {
    if (serviceType.toLowerCase().includes('junk')) {
      return {
        steps: [
          { id: 1, name: 'Service Confirmed', description: 'Your junk removal is scheduled' },
          { id: 2, name: 'Team Dispatched', description: 'Our crew is on the way' },
          { id: 3, name: 'Arrival Window', description: 'Team will arrive within 30 minutes' },
          { id: 4, name: 'Service Complete', description: 'Junk removed and area cleaned' },
        ],
        estimatedTime: '2-4 hours',
        trackingMessage: 'Our junk removal team will call 30 minutes before arrival'
      };
    }
    
    if (serviceType.toLowerCase().includes('cleaning')) {
      return {
        steps: [
          { id: 1, name: 'Cleaning Scheduled', description: 'Your cleaning appointment is confirmed' },
          { id: 2, name: 'Cleaner En Route', description: 'Your cleaner is on the way' },
          { id: 3, name: 'Cleaning Started', description: 'Service has begun' },
          { id: 4, name: 'Cleaning Complete', description: 'Your home is sparkling clean!' },
        ],
        estimatedTime: '2-3 hours',
        trackingMessage: 'Your cleaner will text you when they arrive'
      };
    }
    
    if (serviceType.toLowerCase().includes('notary')) {
      return {
        steps: [
          { id: 1, name: 'Appointment Booked', description: 'Notary service scheduled' },
          { id: 2, name: 'Notary Traveling', description: 'Notary is en route to your location' },
          { id: 3, name: 'Documents Ready', description: 'Reviewing documents for notarization' },
          { id: 4, name: 'Service Complete', description: 'Documents notarized successfully' },
        ],
        estimatedTime: '30-60 minutes',
        trackingMessage: 'Your notary will call when they arrive at your location'
      };
    }
    
    return {
      steps: [
        { id: 1, name: 'Service Scheduled', description: 'Your service is confirmed' },
        { id: 2, name: 'Team Dispatched', description: 'Service team is on the way' },
        { id: 3, name: 'Service Started', description: 'Work has begun' },
        { id: 4, name: 'Service Complete', description: 'Service completed successfully' },
      ],
      estimatedTime: '1-3 hours',
      trackingMessage: 'You will receive updates via phone and SMS'
    };
  };

  const trackingInfo = getTrackingInfo(config.business.serviceType);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Track Your Service</h3>
        
        {upcomingServices.length > 0 ? (
          upcomingServices.map((service, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-semibold">{service.title}</h4>
                  <p className="text-gray-600">
                    Scheduled: {new Date(service.serviceDate).toLocaleDateString()} at{' '}
                    {new Date(service.serviceDate).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Estimated duration: {trackingInfo.estimatedTime}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {service.stage}
                  </span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                {trackingInfo.steps.map((step, stepIndex) => (
                  <div key={step.id} className="flex items-start mb-6 last:mb-0">
                    <div className="flex-shrink-0 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stepIndex === 0 ? 'bg-blue-500 text-white' : 
                        stepIndex === 1 ? 'bg-yellow-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {stepIndex < 2 ? '✓' : stepIndex + 1}
                      </div>
                      {stepIndex < trackingInfo.steps.length - 1 && (
                        <div className={`absolute top-8 left-4 w-0.5 h-6 ${
                          stepIndex === 0 ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium text-gray-900">{step.name}</h5>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {stepIndex === 1 && (
                        <p className="text-sm text-blue-600 mt-1 font-medium">
                          Current Status - ETA: 2:30 PM
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h6 className="font-medium text-blue-900 mb-2">📱 Stay Updated</h6>
                <p className="text-sm text-blue-800">{trackingInfo.trackingMessage}</p>
                <p className="text-sm text-blue-600 mt-2">
                  Questions? Call us at {config.vapi.phoneNumber || '(555) 123-4567'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Services</h3>
            <p className="text-gray-600 mb-4">
              You don't have any services scheduled at the moment.
            </p>
            <button 
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: config.branding.primaryColor }}
            >
              Book a Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
