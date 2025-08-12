import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'نمای کلی' },
    { id: 'hours', label: 'ساعات کاری' },
    { id: 'location', label: 'لوکیشن' },
    { id: 'reviews', label: 'نظرات' }
  ];

  return (
    <div className="mb-6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === tab.id 
                ? 'font-myIranSansMedium text-black' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;