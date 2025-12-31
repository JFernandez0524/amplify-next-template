'use client';

interface BookNewServiceProps {
  config: any;
}

export default function BookNewService({ config }: BookNewServiceProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Book New Service</h3>
      
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Ready to Book?</h3>
        <p className="text-gray-600 mb-6">
          Call us now to schedule your {config.business.serviceType.toLowerCase()} service
        </p>
        
        <div className="space-y-4">
          <a
            href={`tel:${config.vapi.phoneNumber || '555-123-4567'}`}
            className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg text-white transition-colors"
            style={{ backgroundColor: config.branding.primaryColor }}
          >
            📞 Call {config.vapi.phoneNumber || '(555) 123-4567'}
          </a>
          
          <p className="text-sm text-gray-500">
            Available 7 days a week • Same-day service available
          </p>
        </div>
      </div>
    </div>
  );
}
