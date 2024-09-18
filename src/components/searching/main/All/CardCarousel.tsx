// CardCarousel.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { slideData } from '@/data/cards'; // Import the slide data

export const CardCarousel: React.FC = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: '#slider-button-left',
          nextEl: '#slider-button-right',
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-semibold text-indigo-600"
              >
                {slide.title}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="absolute flex justify-center items-center m-auto left-0 right-0 w-fit bottom-12">
        <button
          id="slider-button-left"
          className="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full  hover:bg-indigo-600 !-translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          id="slider-button-right"
          className="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
