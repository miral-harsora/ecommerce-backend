import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselComp = ({ images }) => {
  const slides = Array.isArray(images) ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (slides.length === 0) return null;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (

    <div className="relative mx-auto max-w-[90%] sm:max-w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div
        id="carouselExampleSlidesOnly"
        className="relative h-full"
      >
        {slides.map((content, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${index === currentIndex ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'
              }`}
          >
            <img
              src={content.img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover object-left-top rounded"
            />
            <div className="absolute z-10 right-6 top-[30%] sm:top-[45%] w-[50%] sm:w-[50%] p-2">
              <p className="font-bold text-sm sm:text-2xl md:text-3xl lg:text-4xl text-white text-center break-words">
                {content.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white p-2 sm:p-3 z-20 hover:bg-opacity-75"
      >
        <MdKeyboardArrowLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white p-2 sm:p-3 z-20 hover:bg-opacity-75"
      >
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>



  );
};

export default CarouselComp;
