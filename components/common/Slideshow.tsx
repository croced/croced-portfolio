import useThemeProvider from "@/hooks/useThemeProvider";
import React, { useState } from "react";

interface Props {
  images: string[];
}

const Slideshow: React.FC<Props> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useThemeProvider();

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full md:w-2/3 overflow-hidden">
      <img
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        className="w-full h-auto"
      />

      <div className="absolute bottom-0 left-4 transform -translate-y-1/2 flex items-center">
        <button
          className={`p-2 ${theme === 'light' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white'} `}
          onClick={goToPrevSlide}
        >
          &lt;
        </button>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-y-1/2 flex items-center text-black">
        <p className={`p-2 ${theme === 'light' ? 'bg-white border-2 border-black text-black' : 'bg-black text-white'}`}>
          {currentSlide + 1}/{images.length}
        </p>
      </div>

      <div className="absolute bottom-0 right-4 transform -translate-y-1/2 flex items-center">
        <button
          className={`p-2 ${theme === 'light' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white'} `}
          onClick={goToNextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
