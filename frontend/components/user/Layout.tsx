"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/user/Navbar";
import SplashScreen from "@/components/user/SplashScreen";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash === "true") {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("hasSeenSplash", "true");
      setShowSplash(true);
    }
  }, []);

  if (showSplash === null) return null;

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
