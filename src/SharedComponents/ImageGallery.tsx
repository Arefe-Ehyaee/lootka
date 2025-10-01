import React, { useState } from "react";

export interface Image {
  image_id: string;
  filename: string;
  description?: string | null;
}

interface ImageGalleryProps {
  images: Image[];
  restaurantName: string;
  baseUrl?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  restaurantName,
  baseUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const imageCount = images.length;

  const openModal = (index: number = 0) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Case 1: Only 1 image - show full width
  if (imageCount === 1) {
    return (
      <>
        <div className="my-6">
          <div
            className="relative w-full h-[536px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(0)}
          >
            <img
              src={`${baseUrl}/images/${images[0].image_id}`}
              alt={images[0].description || restaurantName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        {isModalOpen && (
          <ImageModal
            images={images}
            currentIndex={selectedImageIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrevious={previousImage}
            restaurantName={restaurantName}
            baseUrl={baseUrl}
          />
        )}
      </>
    );
  }

  // Case 2: 2 images - show side by side equal size
  if (imageCount === 2) {
    return (
      <>
        <div className="flex gap-2 my-6">
          {images.map((img, index) => (
            <div
              key={img.image_id}
              className="relative flex-1 h-[536px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={`${baseUrl}/images/${img.image_id}`}
                alt={img.description || restaurantName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {isModalOpen && (
          <ImageModal
            images={images}
            currentIndex={selectedImageIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrevious={previousImage}
            restaurantName={restaurantName}
            baseUrl={baseUrl}
          />
        )}
      </>
    );
  }

  // Case 3: 3 images - 1 large on right, 2 stacked on left
  if (imageCount === 3) {
    return (
      <>
        <div className="flex gap-2 my-6">
          {/* Left column: 2 images stacked */}
          <div className="flex flex-col gap-2 flex-1 h-[536px]">
            {images.slice(0, 2).map((img, index) => (
              <div
                key={img.image_id}
                className="relative flex-1 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={`${baseUrl}/images/${img.image_id}`}
                  alt={img.description || restaurantName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right: 1 large image */}
          <div
            className="relative flex-1 h-[536px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(2)}
          >
            <img
              src={`${baseUrl}/images/${images[2].image_id}`}
              alt={images[2].description || restaurantName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        {isModalOpen && (
          <ImageModal
            images={images}
            currentIndex={selectedImageIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrevious={previousImage}
            restaurantName={restaurantName}
            baseUrl={baseUrl}
          />
        )}
      </>
    );
  }

  // Case 4: 4+ images - original layout
  const displayedImages = images.slice(0, 4);

  return (
    <>
      <div className="flex gap-2 my-6">
                {/* Right big image (844x536) */}
        {displayedImages[3] && (
          <div
            className="relative min-w-[844px] h-[536px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(3)}
          >
            <img
              src={`${baseUrl}/images/${displayedImages[3].image_id}`}
              alt={displayedImages[3].description || restaurantName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        {/* Left column (3 smaller images stacked) - 536px total height */}
        <div className="flex flex-col gap-2 h-[536px]">
          {/* Medium image (411x256) */}
          {displayedImages[0] && (
            <div
              className="relative min-w-[411px] h-[256px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(0)}
            >
              <img
                src={`${baseUrl}/images/${displayedImages[0].image_id}`}
                alt={displayedImages[0].description || restaurantName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Bottom row: two small images */}
          <div className="flex gap-2 flex-1">
            {displayedImages.slice(1, 3).map((img, idx) => (
              <div
                key={img.image_id}
                className="relative min-w-[193px] flex-1 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(idx + 1)}
              >
                <img
                  src={`${baseUrl}/images/${img.image_id}`}
                  alt={img.description || restaurantName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay "More" button on the last small image */}
                {idx === 1 && images.length > 4 && (
                  <div className="absolute inset-0 flex font-myYekanFaNumRegular text-xl items-center justify-center bg-black/50 text-white text-lg font-semibold">
                    {/* +{images.length - 4} بیشتر */}
                    . . .
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal for viewing all images */}
      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrevious={previousImage}
          restaurantName={restaurantName}
          baseUrl={baseUrl}
        />
      )}
    </>
  );
};

// Image Modal Component
interface ImageModalProps {
  images: Image[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  restaurantName: string;
  baseUrl?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  restaurantName,
  baseUrl,
}) => {
  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        onClick={onClose}
      >
        ×
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-6xl max-h-[90vh] mx-auto px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`${baseUrl}/images/${currentImage.image_id}`}
          alt={currentImage.description || restaurantName}
          className="max-w-full max-h-[90vh] object-contain"
        />
        {/* Image counter */}
        <div className="text-white text-center mt-4">
          {currentIndex + 1} / {images.length}
        </div>
        {/* Image description if available */}
        {currentImage.description && (
          <p className="text-white text-center mt-2">{currentImage.description}</p>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          ‹
        </button>
      )}
    </div>
  );
};

export default ImageGallery;