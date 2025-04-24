import React, { useState } from "react";

function TrailerCarousel({ trailers }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? trailers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === trailers.length - 1 ? 0 : prev + 1));
  };

  if (trailers.length === 0) {
    return <p className="text-center text-gray-500">No trailers available.</p>;
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${trailers[currentIndex].key}`}
          title={trailers[currentIndex].name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-2 border-amber-500"
        />
      </div>

      {trailers.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/70 text-amber-500 text-3xl font-bold px-3 py-4 rounded-full hover:bg-black/60"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/70 text-amber-500 text-3xl font-bold px-3 py-4 rounded-full hover:bg-black/80"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {trailers.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {trailers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-amber-500" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrailerCarousel;
