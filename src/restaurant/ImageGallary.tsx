import React, { useState } from 'react';
import NoImg from '../assets/images/no-image-icon-23485.png';
import gallary from "../assets/icons/image-03 (1).svg";

interface ImageGalleryProps {
  images: string[];
  restaurantName: string;
  baseUrl?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, restaurantName, baseUrl }) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const getImageUrl = (imgName: string) => {
    if (!imgName || imgName === 'NaN') {
      return NoImg;
    }
    return `${baseUrl}/download-image/${imgName}`;
  };

  const handleImageClick = (index: number) => {
    if (images && images.length > 0) {
      setCurrentImageIndex(index);
      setExpandedImage(images[index]);
    }
  };

  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 0) {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(newIndex);
      setExpandedImage(images[newIndex]);
    }
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 0) {
      const newIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
      setExpandedImage(images[newIndex]);
    }
  };

  return (
    <>
      <div className="px-1">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-10 gap-1 sm:gap-2">
            {/* Featured Large Image */}
            <div
              className="col-span-4 sm:col-span-8 bg-green-600 rounded-lg overflow-hidden aspect-video cursor-pointer hover:opacity-90 transition-opacity relative"
              onClick={() => handleImageClick(0)}
            >
              <img
                src={getImageUrl(images[0])}
                alt={`${restaurantName} 1`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
                <button
                  className="flex flex-row items-center gap-1 sm:gap-2 text-white bg-black bg-opacity-80 hover:bg-opacity-100 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImage(images[0]);
                  }}
                >
                  {images.length}
                  <img src={gallary} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Smaller Images - Mobile: Show as horizontal strip, Desktop: Vertical column */}
            <div className="col-span-4 sm:col-span-2 flex flex-row sm:flex-col gap-1 sm:gap-2">
              {images.slice(1, 4).map((imgName, index) => (
                <div
                  key={index}
                  className="flex-1 sm:flex-none h-20 sm:h-[173px] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(index + 1)}
                >
                  <img
                    src={getImageUrl(imgName)}
                    alt={`${restaurantName} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg h-48 sm:h-64 flex flex-col items-center justify-center p-4">
            <img src={NoImg} alt={restaurantName} className="w-12 sm:w-24 h-auto opacity-50" />
            <p className="text-gray-500 mt-2 text-sm sm:text-base text-center">تصویری موجود نیست</p>
          </div>
        )}
      </div>

      {/* Image Lightbox/Modal */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setExpandedImage(null)}>
          <div className="relative max-w-5xl max-h-screen w-full">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black bg-opacity-50 rounded-full p-1 sm:p-2 hover:bg-opacity-70"
              onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
            >
              <svg className="h-4 w-4 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex justify-center items-center h-full">
              <img
                src={getImageUrl(expandedImage)}
                alt={restaurantName}
                className="max-h-[70vh] sm:max-h-[80vh] max-w-full object-contain"
              />
            </div>

            {/* Navigation controls */}
            {images && images.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center items-center space-x-2 sm:space-x-4">
                <button
                  className="bg-black bg-opacity-50 text-white rounded-full p-1 sm:p-2 hover:bg-opacity-70"
                  onClick={goToPreviousImage}
                >
                  <svg className="h-4 w-4 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="text-white text-sm sm:text-base px-2">
                  {currentImageIndex + 1} / {images.length}
                </div>

                <button
                  className="bg-black bg-opacity-50 text-white rounded-full p-1 sm:p-2 hover:bg-opacity-70"
                  onClick={goToNextImage}
                >
                  <svg className="h-4 w-4 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;