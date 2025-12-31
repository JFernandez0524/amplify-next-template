'use client';

interface ServiceHistoryProps {
  payments: any[];
  config: any;
}

export default function ServiceHistory({ payments, config }: ServiceHistoryProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Service History</h3>
      
      {payments.length > 0 ? (
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {config.business.serviceType} Service
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'Date pending'}
                  </p>
                  {payment.serviceDetails && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{JSON.stringify(payment.serviceDetails)}</p>
                    </div>
                  )}
                </div>
                
                <div className="text-right ml-4">
                  <div className="font-medium text-gray-900">
                    ${payment.amount?.toFixed(2)}
                  </div>
                  <div className={`text-sm ${
                    payment.status === 'completed' ? 'text-green-600' : 
                    payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {payment.status}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Receipt
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Book Again
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Leave Review
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Service History</h3>
          <p className="text-gray-600">
            Your completed services will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
