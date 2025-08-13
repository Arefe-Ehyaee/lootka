import React from "react";

const ExperienceSection = () => {
  const images = [
    "/images/place1.jpg",
    "/images/place2.jpg",
    "/images/place3.jpg",
    "/images/place4.jpg",
    "/images/place5.jpg",
    "/images/place6.jpg",
  ];

  return (
    <section className="relative bg-gray-900 text-white rounded-2xl p-8 overflow-hidden">
      {/* تصاویر شناور */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`place-${index}`}
          className={`absolute w-20 h-20 rounded-full object-cover border-2 border-green-600`}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          تجربه‌های خودتو به لوتکا اضافه کن
        </h2>
        <p className="mb-6 text-gray-300">
          جایی که رفتی و دوستش داشتی؟ به بقیه هم پیشنهاد بده!
        </p>
        <button className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold">
          ادامه
        </button>
      </div>
    </section>
  );
};

export default ExperienceSection;
