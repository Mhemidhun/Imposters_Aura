"use client";
import { useEffect } from "react";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <video
        src="/logo_animation.mp4"
        autoPlay
        playsInline
        muted
        onEnded={onFinish}
        className="w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] max-w-[600px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default SplashScreen;
