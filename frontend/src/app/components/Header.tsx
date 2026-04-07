'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage, languages } from './LanguageContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold">CropGuard</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-5 text-sm font-medium">
            <Link href="/" className={`hover:text-green-200 ${pathname === '/' ? 'text-green-200 border-b-2 border-green-300' : ''}`}>
              {t.common.home}
            </Link>
            <Link href="/about" className={`hover:text-green-200 ${pathname === '/about' ? 'text-green-200 border-b-2 border-green-300' : ''}`}>
              {t.common.about}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="bg-green-600 text-white px-2 py-1 rounded text-sm">
              {languages.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
            </select>
            <Link href="/login" className="bg-white text-green-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-50">{t.common.login}</Link>
            <Link href="/signup" className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-600">{t.common.signup}</Link>
          </div>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2"><span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span></button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-green-800 px-4 pb-4 space-y-3">
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="py-2 hover:text-green-200">{t.common.home}</Link>
            <Link href="/about" className="py-2 hover:text-green-200">{t.common.about}</Link>
          </nav>
          <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="w-full bg-green-700 text-white px-3 py-2 rounded">
            {languages.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
          </select>
          <div className="flex gap-2">
            <Link href="/login" className="flex-1 bg-white text-green-700 text-center py-2 rounded font-medium">{t.common.login}</Link>
            <Link href="/signup" className="flex-1 bg-green-500 text-white text-center py-2 rounded font-medium">{t.common.signup}</Link>
          </div>
        </div>
      )}
    </header>
  );
}