"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const cardRef = useRef(null);

  /* ---------------- INIT GSAP + AOS ---------------- */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setMotionEnabled(false);
      return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  /* ---------------- CURSOR 3D HOVER ---------------- */
  const handleMouseMove = (e) => {
    if (!motionEnabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const resetCard = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Accessibility Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMotionEnabled(!motionEnabled)}
          className="px-4 py-2 text-sm border rounded-lg bg-white shadow hover:bg-gray-50"
        >
          {motionEnabled ? "Disable Motion" : "Enable Motion"}
        </button>
      </div>

      <div id={motionEnabled ? "smooth-wrapper" : undefined}>
        <div id={motionEnabled ? "smooth-content" : undefined}>

          {/* HERO */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
            <h1
              className="text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Premium Motion Landing Page
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Smooth scrolling, subtle animations, and calm interactions.
            </p>
            <button
              className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Get Started
            </button>
          </section>

          {/* FEATURES */}
          <section className="py-32 bg-gray-50 px-8">
            <h2
              className="text-4xl font-bold text-center mb-20"
              data-aos="fade-up"
            >
              Designed with Care
            </h2>

            <div className="grid md:grid-cols-3 gap-14 max-w-6xl mx-auto">
              <div
                className="p-8 bg-white rounded-2xl shadow-sm"
                data-aos="fade-up"
                data-speed={motionEnabled ? "0.9" : undefined}
              >
                <h3 className="text-2xl font-semibold mb-3">
                  Subtle Animations
                </h3>
                <p className="text-gray-600">
                  Motion that enhances without distracting.
                </p>
              </div>

              <div
                className="p-8 bg-white rounded-2xl shadow-sm"
                data-aos="fade-up"
                data-aos-delay="100"
                data-speed={motionEnabled ? "1.05" : undefined}
              >
                <h3 className="text-2xl font-semibold mb-3">
                  Lightweight UI
                </h3>
                <p className="text-gray-600">
                  Fast loads, clean layout, lots of air.
                </p>
              </div>

              <div
                className="p-8 bg-white rounded-2xl shadow-sm"
                data-aos="fade-up"
                data-aos-delay="200"
                data-speed={motionEnabled ? "0.95" : undefined}
              >
                <h3 className="text-2xl font-semibold mb-3">
                  Accessibility First
                </h3>
                <p className="text-gray-600">
                  Motion respects user comfort.
                </p>
              </div>
            </div>
          </section>

          {/* 3D HOVER CARD */}
          <section className="py-32 flex justify-center px-6">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetCard}
              data-aos="fade-up"
              className="w-full max-w-md p-10 bg-white rounded-2xl shadow-lg transition-transform duration-200"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Cursor-based 3D Hover
              </h3>
              <p className="text-gray-600">
                Depth using pure CSS transforms — no WebGL.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center px-6">
            <h2
              className="text-5xl font-bold text-white mb-6"
              data-aos="fade-up"
            >
              Motion Done Right
            </h2>
            <p
              className="text-lg text-gray-300 max-w-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Designed to guide attention, not overwhelm.
            </p>
          </section>

          {/* FOOTER */}
          <footer className="py-8 text-center text-gray-500">
            © {new Date().getFullYear()} Premium UX Landing
          </footer>

        </div>
      </div>
    </div>
  );
}
