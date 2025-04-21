"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  { id: 1, image: "/Premium PSD _ Fashion men's event discount facebook cover or web banner design template.jpeg", title: "Exclusive Products", subtitle: "Get awesome items only in Imposter online shop" },
  { id: 2, image: "/Premium PSD _ Fashion sale social media facebook cover design template.jpeg", title: "New Arrivals", subtitle: "Shop the latest trendy T-shirts" },
  { id: 3, image: "/Website Banner for Men's Shirts.jpeg", title: "Limited Edition", subtitle: "Exclusive collection available now" },
];

const HeroSection = () => {
  return (
    <div className="w-full h-[80vh] relative pt-[100px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center">
              <h1 className="text-5xl font-bold">{slide.title}</h1>
              <p className="text-lg mt-2">{slide.subtitle}</p>
              <div className="mt-4">
                <button className="bg-[#d4a373] text-white px-6 py-2 rounded-md mr-2">BUY IT NOW</button>
                <button className="border border-white px-6 py-2 rounded-md">LEARN MORE</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
