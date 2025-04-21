"use client"
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "I’m amazed, I should say thank you so much for your awesome template. Design is so good and neat, every detail has been taken care of. This team is really amazing and talented! I will work only with this agency.",
    author: "John Doe / CEO of XYZ Corp",
  },
  {
    quote:
      "A truly outstanding experience! The design quality is top-notch, and the support team is fantastic. Highly recommend!",
    author: "Jane Smith / Founder of ABC Ltd",
  },
  {
    quote:
      "The best decision I made for my business. The template is sleek, modern, and highly customizable.",
    author: "Michael Brown / Director at PQR Solutions",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section
      className="relative flex items-center justify-center h-[400px] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/Download premium image of T-shirt laughing smile white_  by Tanasiri about white t-shirt, face, person, mockup, and portrait 12477761.jpeg')" }} // Update the path to your background image
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center px-6 md:px-12 max-w-2xl">
        <h3 className="text-lg uppercase text-gray-300">Happy Clients</h3>
        <h2 className="text-3xl font-bold mb-4">TESTIMONIALS</h2>
        <p className="text-lg italic">"{testimonials[activeIndex].quote}"</p>
        <p className="mt-4 text-sm text-gray-300">
          {testimonials[activeIndex].author}
        </p>
        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === activeIndex ? "bg-white scale-125" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
