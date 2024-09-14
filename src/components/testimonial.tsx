// components/TestimonialSlider.tsx
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { FC } from 'react';

const testimonials = [
  {
    name: "John D.",
    position: "IT Director",
    feedback:
      "SecureNetPro's commitment to staying ahead of the latest cyber threats is impressive. Their continuous monitoring and rapid response have been crucial in safeguarding our patient data and maintaining compliance.",
  },
  {
    name: "Sarah K.",
    position: "Founder, Retail Solutions",
    feedback:
      "As a small business owner, I was concerned about cyber threats but didn't know where to start. SecureNetPro made the process simple and affordable. Now I have peace of mind knowing my business is protected.",
  },
  {
    name: "Park Shin W.",
    position: "CTO, Tech Innovations",
    feedback:
      "SecureNetPro's unparalleled expertise and proactive defense strategies have been a game-changer for us. The balance they've struck between digital safety and ease of use is remarkable.",
  },
  {
    name: "John D.",
    position: "IT Director",
    feedback:
      "SecureNetPro's commitment to staying ahead of the latest cyber threats is impressive. Their continuous monitoring and rapid response have been crucial in safeguarding our patient data and maintaining compliance.",
  },
  {
    name: "Sarah K.",
    position: "Founder, Retail Solutions",
    feedback:
      "As a small business owner, I was concerned about cyber threats but didn't know where to start. SecureNetPro made the process simple and affordable. Now I have peace of mind knowing my business is protected.",
  },
  {
    name: "Park Shin W.",
    position: "CTO, Tech Innovations",
    feedback:
      "SecureNetPro's unparalleled expertise and proactive defense strategies have been a game-changer for us. The balance they've struck between digital safety and ease of use is remarkable.",
  },
  // Add 3 more testimonials here
];

export const Testimonials: FC = () => {
  return (
    <div className=" relative w-full h-full  my-12 ">
        <div className=" absolute w-full h-full bg-[url(/brick-pattern.png)]  bg-opacity-5 opacity-15  bg-no-repeat bg-center bg-cover " />
        <h2 className="text-white text-center text-3xl font-semibold mb-1"> Customer Testimonials</h2>
        <p className="text-white text-center  font-light mb-8">Hear what our customers have to say about our services</p>
      <div className="container mx-auto max-w-7xl ">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
        
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
        
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/10 backdrop-blur-sm border  border-gray-50 rounded-lg p-6 shadow-sm shadow-white text-white mx-4 mb-6 min-h-52 max-h-54">
                <p className="text-sm font-light mb-4">&quot;{testimonial.feedback}&quot;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="text-base font-semibold">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


