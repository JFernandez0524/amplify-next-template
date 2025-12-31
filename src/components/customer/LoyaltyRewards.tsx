'use client';

interface LoyaltyRewardsProps {
  loyaltyPoints: number;
  totalSpent: number;
  config: any;
}

export default function LoyaltyRewards({ loyaltyPoints, totalSpent, config }: LoyaltyRewardsProps) {
  const nextRewardAt = Math.ceil(loyaltyPoints / 100) * 100;
  const pointsToNextReward = nextRewardAt - loyaltyPoints;
  const progressPercentage = (loyaltyPoints % 100);

  const getRewards = () => {
    const serviceType = config.business.serviceType.toLowerCase();
    
    if (serviceType.includes('junk')) {
      return [
        { points: 100, reward: '$10 off next junk removal', description: 'Save on your next cleanout' },
        { points: 250, reward: 'Free small item pickup', description: 'Up to 3 items removed free' },
        { points: 500, reward: '$50 off large cleanout', description: 'Perfect for garage or basement' },
        { points: 1000, reward: 'Free full truck load', description: 'Complete junk removal service' },
      ];
    }
    
    if (serviceType.includes('cleaning')) {
      return [
        { points: 100, reward: '$15 off next cleaning', description: 'Discount on regular service' },
        { points: 250, reward: 'Free deep clean add-on', description: 'Oven or fridge cleaning included' },
        { points: 500, reward: 'Free monthly service', description: 'One complete house cleaning' },
        { points: 1000, reward: 'VIP customer status', description: 'Priority booking & 20% off' },
      ];
    }
    
    if (serviceType.includes('notary')) {
      return [
        { points: 100, reward: '$10 off next notarization', description: 'Discount on mobile service' },
        { points: 250, reward: 'Free document review', description: 'Pre-notarization consultation' },
        { points: 500, reward: 'Priority scheduling', description: 'Same-day service guarantee' },
        { points: 1000, reward: 'Annual service package', description: '10 notarizations for $200' },
      ];
    }
    
    return [
      { points: 100, reward: '$10 service credit', description: 'Apply to any service' },
      { points: 250, reward: 'Priority booking', description: 'Skip the waiting list' },
      { points: 500, reward: '$50 service credit', description: 'Significant savings' },
      { points: 1000, reward: 'VIP customer status', description: 'Exclusive benefits' },
    ];
  };

  const rewards = getRewards();
  const availableRewards = rewards.filter(reward => loyaltyPoints >= reward.points);
  const upcomingRewards = rewards.filter(reward => loyaltyPoints < reward.points);

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{loyaltyPoints} Points</h3>
            <p className="text-blue-100">Total earned from ${totalSpent.toFixed(2)} spent</p>
          </div>
          <div className="text-right">
            <div className="text-3xl">⭐</div>
          </div>
        </div>
        
        {/* Progress to next reward */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to next reward</span>
            <span>{pointsToNextReward} points to go</span>
          </div>
          <div className="w-full bg-blue-400 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      {availableRewards.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🎁 Available Rewards</h3>
          <div className="space-y-4">
            {availableRewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-900">{reward.reward}</h4>
                  <p className="text-sm text-green-700">{reward.description}</p>
                  <p className="text-xs text-green-600 mt-1">{reward.points} points required</p>
                </div>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Rewards */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">🔮 Upcoming Rewards</h3>
        <div className="space-y-4">
          {upcomingRewards.map((reward, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{reward.reward}</h4>
                <p className="text-sm text-gray-600">{reward.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {reward.points - loyaltyPoints} more points needed
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-400">{reward.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">💡 How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl mr-3">💰</div>
            <div>
              <div className="font-medium">Spend Money</div>
              <div className="text-sm text-gray-600">1 point per $1 spent</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl mr-3">⭐</div>
            <div>
              <div className="font-medium">Leave Reviews</div>
              <div className="text-sm text-gray-600">25 bonus points</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl mr-3">👥</div>
            <div>
              <div className="font-medium">Refer Friends</div>
              <div className="text-sm text-gray-600">50 points per referral</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl mr-3">🎂</div>
            <div>
              <div className="font-medium">Birthday Bonus</div>
              <div className="text-sm text-gray-600">100 points annually</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
