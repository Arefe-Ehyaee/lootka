import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import {
  Utensils,
  Coffee,
  CakeSlice,
  Landmark,
  BookOpenCheck,
  ShoppingBag,
  TreePine,
  Mountain,
  Waves,
  Tent,
  BedDouble,
  Camera,
  Palette,
  Music,
  Theater,
  Film,
  Gift,
  Wand2,
  Footprints
} from 'lucide-react';

interface StepSixProps {
  onNext: () => void;
  onBack: () => void;
}

interface Companion {
  id: string;
  name: string;
  subItems: string[];
}

const StepSix: React.FC<StepSixProps> = ({ onNext, onBack }) => {
  const [selectedSubItems, setSelectedSubItems] = useState<{ [key: string]: string[] }>({});

  const companions: Companion[] = [
    { id: 'food', name: 'شکم گردی و غذا', subItems: ['غذاهای محلی و بومی', 'نان و شیرینی‌های مخصوص', 'کافه گردی', 'رستوران گردی'] },
    { id: 'nature', name: 'طبیعت گردی', subItems: ['جنگل', 'کوه', 'ساحل و دریا', 'آبشار و رودخانه', 'کمپینگ در طبیعت'] },
    { id: 'city', name: 'شهرگردی و تفریحات شبانه', subItems: ['پیاده‌روی', 'عکاسی', 'کافه و رستوران خیابانی', 'مکان‌های معروف شهر'] },
    { id: 'culturalHistorical', name: 'فرهنگی و تاریخی', subItems: ['بناهای تاریخی', 'موزه گردی', 'بازارهای سنتی و قدیمی', 'تجربه های محلی و بومی', 'آیین ها و مراسم خاص'] },
    { id: 'special', name: 'تجربه‌های خاص و بومی', subItems: ['اقامت در بومگردی ها', 'بازارهای محلی'] },
    { id: 'familyChildren', name: 'خانوادگی و کودکان', subItems: ['شهربازی', 'باغ وحش'] },
    { id: 'Artistic', name: 'فعالیت‌های هنری', subItems: ['گالرى‌های هنری', 'کنسرت‌ها', 'تئاترها', 'سینما'] },
    { id: 'shopping', name: 'خرید و بازار گردی', subItems: ['خرید سوغاتی', 'پاساژها و مال‌های معروف'] }
  ];

  // Subcategory icon mapper
  const getIcon = (label: string): React.ReactElement | null => {
    const icons: { [key: string]: React.ReactElement } = {
      'غذاهای محلی و بومی': <Utensils className="w-4 h-4" />,
      'نان و شیرینی‌های مخصوص': <CakeSlice className="w-4 h-4" />,
      'کافه گردی': <Coffee className="w-4 h-4" />,
      'رستوران گردی': <Utensils className="w-4 h-4" />,
      'بناهای تاریخی': <Landmark className="w-4 h-4" />,
      'موزه گردی': <BookOpenCheck className="w-4 h-4" />,
      'بازارهای سنتی و قدیمی': <ShoppingBag className="w-4 h-4" />,
      'تجربه های محلی و بومی': <Wand2 className="w-4 h-4" />,
      'آیین ها و مراسم خاص': <Footprints className="w-4 h-4" />,
      'جنگل': <TreePine className="w-4 h-4" />,
      'کوه': <Mountain className="w-4 h-4" />,
      'ساحل و دریا': <Waves className="w-4 h-4" />,
      'آبشار و رودخانه': <Waves className="w-4 h-4" />,
      'کمپینگ در طبیعت': <Tent className="w-4 h-4" />,
      'اقامت در بومگردی ها': <BedDouble className="w-4 h-4" />,
      'بازارهای محلی': <ShoppingBag className="w-4 h-4" />,
      'شهربازی': <Gift className="w-4 h-4" />,
      'باغ وحش': <Gift className="w-4 h-4" />,
      'پیاده‌روی': <Footprints className="w-4 h-4" />,
      'عکاسی': <Camera className="w-4 h-4" />,
      'کافه و رستوران خیابانی': <Coffee className="w-4 h-4" />,
      'مکان‌های معروف شهر': <Landmark className="w-4 h-4" />,
      'گالرى‌های هنری': <Palette className="w-4 h-4" />,
      'کنسرت‌ها': <Music className="w-4 h-4" />,
      'تئاترها': <Theater className="w-4 h-4" />,
      'سینما': <Film className="w-4 h-4" />,
      'خرید سوغاتی': <Gift className="w-4 h-4" />,
      'پاساژها و مال‌های معروف': <ShoppingBag className="w-4 h-4" />
    };
    return icons[label] || null;
  };

  const toggleSubItem = (parentId: string, subItem: string) => {
    setSelectedSubItems(prev => {
      const current = prev[parentId] || [];
      const updated = current.includes(subItem)
        ? current.filter(item => item !== subItem)
        : [...current, subItem];
      return { ...prev, [parentId]: updated };
    });
  };

  return (
    <div className="w-full mt-20 mb-[117px] px-8">
      <div className="mb-10 font-myIranSansBold text-3xl text-center p-4">
        علاقه‌مندی‌هات رو انتخاب کن!
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {companions.map(option => (
          <div key={option.id} className="flex flex-col gap-3">
            <div className="text-base font-myIranSansBold text-gray-800">{option.name}</div>
            <div className="flex flex-wrap gap-3">
              {option.subItems.map(sub => (
                <button
                  key={sub}
                  onClick={() => toggleSubItem(option.id, sub)}
                  className={`px-2 py-1 rounded-full border text-sm flex items-center gap-1 transition-all duration-200 font-myIranSansRegular
                    ${selectedSubItems[option.id]?.includes(sub)
                      ? 'bg-[#648A33]/20 shadow-sm'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {getIcon(sub)}
                  {sub}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-[143px] mt-16">
        <CustomButton text="بعدی" className="border text-black font-myIranSansRegular text-[12px] w-[180px] h-[44px] bg-[#648A33] justify-center text-white" handleOnClick={onNext} />

        <button
          onClick={onBack}
          className="font-myIranSansRegular text-[14px] underline underline-offset-8 text-[#648A33]"
        >
          بازگشت به مرحله قبل
        </button>
      </div>
    </div>
  );
};

export default StepSix;