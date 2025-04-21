import CategorySection from "@/components/user/CategorySection";
import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import Newsletter from "@/components/user/Newsletter";
import Testimonials from "@/components/user/Testimonials";
import TrendyProducts from "@/components/user/TrendyProducts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendyProducts />
      <Testimonials />
      <Newsletter />
      
    </>
  );
}
