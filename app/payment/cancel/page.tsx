import { getNicheConfig } from '@/src/config/niche-config';

export default function PaymentCancel() {
  const config = getNicheConfig();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was cancelled. No charges were made.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Still need our service?</h3>
          <p className="text-sm text-gray-600 mb-4">
            You can still book your {config.business.serviceType.toLowerCase()} service. 
            Contact us directly or try the payment process again.
          </p>
          <div className="flex space-x-3">
            <a
              href={`tel:${config.vapi.phoneNumber}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-blue-700"
            >
              Call Us
            </a>
            <a
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-gray-300"
            >
              Try Again
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
