import { useState } from "react";
import { ChevronLeft, ChevronRight, Images, X, ZoomIn } from "lucide-react";

export default function ImageGallery({ images = [], title = "Project" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Show placeholder if no images
  if (!images.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 rounded-full bg-vibrant/10">
            <Images size={32} className="text-vibrant" />
          </div>
          <div>
            <p className="font-medium text-black">Screenshots coming soon</p>
            <p className="text-sm text-gray-600 mt-1">Project images will be added here</p>
          </div>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative rounded-xl border-2 border-gray-200 bg-white overflow-hidden group">
          <div className="aspect-video bg-gray-50 flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              className="w-full h-full object-contain cursor-pointer"
              onClick={openFullscreen}
            />
          </div>

          {/* Zoom Icon Hint */}
          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn size={16} />
          </div>

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white
                           flex items-center justify-center hover:bg-black transition-all
                           opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white
                           flex items-center justify-center hover:bg-black transition-all
                           opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Strip - Only show if more than 1 image */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all
                  ${
                    index === currentIndex
                      ? "border-vibrant ring-2 ring-vibrant/20"
                      : "border-gray-200 hover:border-vibrant/50"
                  }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Tip Text */}
        <p className="text-xs text-gray-600 text-center">
          Click image to view fullscreen
          {images.length > 1 && " • Use arrows or thumbnails to navigate"}
        </p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white
                       flex items-center justify-center hover:bg-white/20 transition-all z-10"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Centered Image Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <img
              src={images[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 text-white
                           flex items-center justify-center hover:bg-white/20 transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 text-white
                           flex items-center justify-center hover:bg-white/20 transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
