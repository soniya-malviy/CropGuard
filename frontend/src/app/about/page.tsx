'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../components/LanguageContext';

export default function About() {
  const { t, isLoading } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    { url: "/image1.avif", alt: "Healthy Crop Fields" },
    { url: "/image2.jpg", alt: "Smart Farming Technology" },
    { url: "/image3.jpg", alt: "Sustainable Agriculture" },
    { url: "https://images.unsplash.com/photo-1574943320219-553eb213f1df?w=1200&h=400&fit=crop", alt: "Crop Disease Detection" },
    { url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=400&fit=crop", alt: "Farmer Community" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Carousel */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            ))}
            
            <button onClick={() => setCurrentImageIndex((prev) => prev === 0 ? carouselImages.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2" aria-label="Previous">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setCurrentImageIndex((prev) => prev === carouselImages.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2" aria-label="Next">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`rounded-full ${index === currentImageIndex ? 'w-3 h-3 bg-white' : 'w-2 h-2 bg-white/50'}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-green-100">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">{t.about.title}</h2>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">{t.about.description}</p>
          
          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">🎯</div>
                <h3 className="font-bold text-green-800 text-xl">{t.about.mission}</h3>
              </div>
              <p className="text-gray-700">{t.about.missionDesc}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">👁️</div>
                <h3 className="font-bold text-blue-800 text-xl">{t.about.vision}</h3>
              </div>
              <p className="text-gray-700">{t.about.visionDesc}</p>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-10">
            <h3 className="font-bold text-gray-800 text-2xl mb-6">{t.about.features}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700">{t.about.feature1}</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700">{t.about.feature2}</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700">{t.about.feature3}</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700">{t.about.feature4}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-6 border-t-2 border-green-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-500 mt-1">{t.about.stats.farmers}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">20+</div>
                <div className="text-sm text-gray-500 mt-1">{t.about.stats.crops}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-500 mt-1">{t.about.stats.accuracy}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-500 mt-1">{t.about.stats.support}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}