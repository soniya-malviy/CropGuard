'use client';

import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'hi' | 'es' | 'fr' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn';

interface Translations {
  common: { home: string; about: string; contact: string; login: string; signup: string; logout: string; language: string };
  hero: { title: string; subtitle: string };
  upload: { title: string; clickToUpload: string; supportedFormats: string; analyze: string; analyzing: string };
  result: { detectionResult: string; confidence: string; severity: string; topPredictions: string; cause: string; treatment: string; precautions: string };
  severity: { none: string; low: string; medium: string; high: string; unknown: string };
  features: { accurateTitle: string; accurateDesc: string; smartTitle: string; smartDesc: string; easyTitle: string; easyDesc: string };
  auth: { welcome: string; email: string; password: string; confirmPassword: string; loginButton: string; signupButton: string; noAccount: string; hasAccount: string };
  footer: { copyright: string };
  about: { title: string; description: string; mission: string; missionDesc: string; vision: string; visionDesc: string; features: string; feature1: string; feature2: string; feature3: string; feature4: string; stats: { farmers: string; crops: string; accuracy: string; support: string } };
  contact: { title: string; name: string; namePlaceholder: string; emailPlaceholder: string; message: string; messagePlaceholder: string; sendButton: string };
}

const en: Translations = {
  common: { home: 'Home', about: 'About', contact: 'Contact', login: 'Login', signup: 'Sign Up', logout: 'Logout', language: 'Language' },
  hero: { title: 'AI-Powered Crop Disease Detection', subtitle: 'Upload a photo of your crop leaf and get instant disease detection with personalized remedy recommendations' },
  upload: { title: 'Upload Your Crop Image', clickToUpload: 'Click to upload crop image', supportedFormats: 'Support for JPG, PNG formats', analyze: 'Analyze Image', analyzing: 'Analyzing...' },
  result: { detectionResult: 'Detection Result', confidence: 'Confidence', severity: 'Severity', topPredictions: 'Top Predictions', cause: 'Cause', treatment: 'Treatment', precautions: 'Precautions' },
  severity: { none: 'None', low: 'Low', medium: 'Medium', high: 'High', unknown: 'Unknown' },
  features: { accurateTitle: 'Accurate Detection', accurateDesc: 'AI-powered detection with 95%+ accuracy using advanced Vision Transformers', smartTitle: 'Smart Recommendations', smartDesc: 'Get cause analysis, precautions, and treatment recommendations', easyTitle: 'Easy to Use', easyDesc: 'Simple interface designed for farmers - upload, analyze, get results' },
  auth: { welcome: 'Welcome to CropGuard', email: 'Email', password: 'Password', confirmPassword: 'Confirm Password', loginButton: 'Login', signupButton: 'Sign Up', noAccount: "Don't have an account?", hasAccount: 'Already have an account?' },
  footer: { copyright: '© 2026 CropGuard - Helping Farmers Grow Healthier Crops' },
  about: { title: 'About CropGuard', description: 'CropGuard is an AI-powered crop disease detection system designed to help farmers identify plant diseases quickly and accurately. Using advanced Vision Transformer technology, we provide instant disease detection and personalized treatment recommendations.', mission: 'Our Mission', missionDesc: 'To reduce crop losses by enabling early disease detection through accessible AI technology.', vision: 'Our Vision', visionDesc: 'To empower every farmer with smart disease detection tools for sustainable agriculture.', features: 'Key Features', feature1: 'AI-powered disease detection with 95%+ accuracy', feature2: 'Detailed cause analysis and treatment recommendations', feature3: 'Both organic and chemical treatment options', feature4: 'Multi-language support', stats: { farmers: 'Farmers Helped', crops: 'Crop Types', accuracy: 'Accuracy Rate', support: 'Support' } },
  contact: { title: 'Contact Us', name: 'Name', namePlaceholder: 'Your name', emailPlaceholder: 'email@example.com', message: 'Message', messagePlaceholder: 'Your message...', sendButton: 'Send Message' }
};

const hi: Translations = {
  common: { home: 'होम', about: 'हमारे बारे में', contact: 'संपर्क', login: 'लॉगिन', signup: 'साइन अप', logout: 'लॉगआउट', language: 'भाषा' },
  hero: { title: 'एआई-संचालित फसल रोग पहचान', subtitle: 'अपनी फसल के पत्ते की तस्वीर अपलोड करें और तुरंत रोग पहचान प्राप्त करें' },
  upload: { title: 'अपनी फसल की छवि अपलोड करें', clickToUpload: 'फसल छवि अपलोड करने के लिए क्लिक करें', supportedFormats: 'JPG, PNG समर्थित', analyze: 'विश्लेषण करें', analyzing: 'विश्लेषण हो रहा है...' },
  result: { detectionResult: 'पहचान परिणाम', confidence: 'विश्वास', severity: 'गंभीरता', topPredictions: 'शीर्ष पूर्वानुमान', cause: 'कारण', treatment: 'उपचार', precautions: 'सावधानियां' },
  severity: { none: 'कोई नहीं', low: 'कम', medium: 'मध्यम', high: 'उच्च', unknown: 'अज्ञात' },
  features: { accurateTitle: 'सटीक पहचान', accurateDesc: 'एआई-संचालित पहचान जो 95%+ सटीकता प्रदान करती है', smartTitle: 'स्मार्ट सुझाव', smartDesc: 'कारण, सावधानियां और उपचार सुझाव प्राप्त करें', easyTitle: 'उपयोग में आसान', easyDesc: 'किसानों के लिए डिज़ाइन किया गया सरल इंटरफ़ेस' },
  auth: { welcome: 'CropGuard में आपका स्वागत है', email: 'ईमेल', password: 'पासवर्ड', confirmPassword: 'पासवर्ड की पुष्टि करें', loginButton: 'लॉगिन', signupButton: 'साइन अप', noAccount: 'खाता नहीं है?', hasAccount: 'पहले से खाता है?' },
  footer: { copyright: '© 2026 CropGuard - किसानों को स्वस्थ फसल उगाने में मदद' },
  about: { title: 'CropGuard के बारे में', description: 'CropGuard एक AI-संचालित फसल रोग पहचान प्रणाली है जो किसानों को पौधों के रोगों की पहचान करने में मदद करती है।', mission: 'हमारा लक्ष्य', missionDesc: 'सुलभ AI तकनीक से शीघ्र रोग पहचान कर फसल हानि कम करना।', vision: 'हमारी दृष्टि', visionDesc: 'हर किसान को सतल कृषि के लिए स्मार्ट रोग पहचान उपकरण देना।', features: 'मुख्य विशेषताएं', feature1: '95%+ सटीकता के साथ AI-संचालित रोग पहचान', feature2: 'विस्तृत कारण विश्लेषण और उपचार सुझाव', feature3: 'जैविक और रासायनिक दोनों उपचार विकल्प', feature4: 'बहुभाषी समर्थन', stats: { farmers: 'किसान मदद किए', crops: 'फसल प्रकार', accuracy: 'सटीकता दर', support: 'सहायता' } },
  contact: { title: 'संपर्क करें', name: 'नाम', namePlaceholder: 'आपका नाम', emailPlaceholder: 'email@example.com', message: 'संदेश', messagePlaceholder: 'आपका संदेश...', sendButton: 'भेजें' }
};

const es: Translations = {
  common: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto', login: 'Iniciar sesión', signup: 'Registrarse', logout: 'Cerrar sesión', language: 'Idioma' },
  hero: { title: 'Detección de enfermedades de cultivos con IA', subtitle: 'Cargue una foto de su hoja de cultivo y obtenga detección instantánea de enfermedades' },
  upload: { title: 'Cargue su imagen de cultivo', clickToUpload: 'Haga clic para cargar imagen', supportedFormats: 'Soporte para JPG, PNG', analyze: 'Analizar imagen', analyzing: 'Analizando...' },
  result: { detectionResult: 'Resultado de detección', confidence: 'Confianza', severity: 'Severidad', topPredictions: 'Principales predicciones', cause: 'Causa', treatment: 'Tratamiento', precautions: 'Precauciones' },
  severity: { none: 'Ninguno', low: 'Bajo', medium: 'Medio', high: 'Alto', unknown: 'Desconocido' },
  features: { accurateTitle: 'Detección precisa', accurateDesc: 'Detección con IA con 95%+ de precisión', smartTitle: 'Recomendaciones inteligentes', smartDesc: 'Obtenga análisis de causa y recomendaciones', easyTitle: 'Fácil de usar', easyDesc: 'Interfaz simple diseñada para agricultores' },
  auth: { welcome: 'Bienvenido a CropGuard', email: 'Correo electrónico', password: 'Contraseña', confirmPassword: 'Confirmar contraseña', loginButton: 'Iniciar sesión', signupButton: 'Registrarse', noAccount: '¿No tiene cuenta?', hasAccount: '¿Ya tiene cuenta?' },
  footer: { copyright: '© 2026 CropGuard - Ayudando a los agricultores' },
  about: { title: 'Acerca de CropGuard', description: 'CropGuard es un sistema de detección de enfermedades de cultivos con IA.', mission: 'Nuestra misión', missionDesc: 'Reducir las pérdidas de cultivos mediante la detección temprana.', vision: 'Nuestra visión', visionDesc: 'Empoderar a cada agricultor con herramientas de detección.', features: 'Características clave', feature1: 'Detección con IA con 95%+ de precisión', feature2: 'Análisis detallado y recomendaciones', feature3: 'Opciones de tratamiento orgánico y químico', feature4: 'Soporte multilingüe', stats: { farmers: 'Agricultores ayudados', crops: 'Tipos de cultivos', accuracy: 'Tasa de precisión', support: 'Soporte' } },
  contact: { title: 'Contáctenos', name: 'Nombre', namePlaceholder: 'Tu nombre', emailPlaceholder: 'email@ejemplo.com', message: 'Mensaje', messagePlaceholder: 'Tu mensaje...', sendButton: 'Enviar mensaje' }
};

const fr: Translations = {
  common: { home: 'Accueil', about: 'À propos', contact: 'Contact', login: 'Connexion', signup: 'S\'inscrire', logout: 'Déconnexion', language: 'Langue' },
  hero: { title: 'Détection des maladies des cultures par IA', subtitle: 'Téléchargez une photo de votre feuille de culture' },
  upload: { title: 'Téléchargez votre image', clickToUpload: 'Cliquez pour télécharger', supportedFormats: 'Formats JPG, PNG', analyze: 'Analyser', analyzing: 'Analyse en cours...' },
  result: { detectionResult: 'Résultat de détection', confidence: 'Confiance', severity: 'Gravité', topPredictions: 'Principales prédictions', cause: 'Cause', treatment: 'Traitement', precautions: 'Précautions' },
  severity: { none: 'Aucun', low: 'Faible', medium: 'Moyen', high: 'Élevé', unknown: 'Inconnu' },
  features: { accurateTitle: 'Détection précise', accurateDesc: 'Détection par IA avec 95%+ de précision', smartTitle: 'Recommandations intelligentes', smartDesc: 'Obtenez analyse et recommandations', easyTitle: 'Facile à utiliser', easyDesc: 'Interface simple pour les agricoles' },
  auth: { welcome: 'Bienvenue sur CropGuard', email: 'E-mail', password: 'Mot de passe', confirmPassword: 'Confirmer le mot de passe', loginButton: 'Connexion', signupButton: 'S\'inscrire', noAccount: 'Pas de compte?', hasAccount: 'Déjà un compte?' },
  footer: { copyright: '© 2026 CropGuard - Aider les agriculteurs' },
  about: { title: 'À propos de CropGuard', description: 'CropGuard est un système de détection des maladies basé sur l\'IA.', mission: 'Notre mission', missionDesc: 'Réduire les pertes de récoltes grâce à la détection précoce.', vision: 'Notre vision', visionDesc: 'Permettre à chaque agriculteur d\'utiliser des outils de détection.', features: 'Fonctionnalités clés', feature1: 'Détection par IA avec 95%+ de précision', feature2: 'Analyse détaillée et recommandations', feature3: 'Options de traitement organique et chimique', feature4: 'Support multilingue', stats: { farmers: 'Agriculteurs aidés', crops: 'Types de cultures', accuracy: 'Taux de précision', support: 'Support' } },
  contact: { title: 'Contactez-nous', name: 'Nom', namePlaceholder: 'Votre nom', emailPlaceholder: 'email@exemple.com', message: 'Message', messagePlaceholder: 'Votre message...', sendButton: 'Envoyer' }
};

const translations: Record<Language, Translations> = { en, hi, es, fr, bn: en, te: en, mr: en, ta: en, gu: en, kn: en };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  isLoading: boolean;
  languages: { code: Language; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिंदी' },
  { code: 'es' as Language, name: 'Español' },
  { code: 'fr' as Language, name: 'Français' },
  { code: 'bn' as Language, name: 'বাংলা' },
  { code: 'te' as Language, name: 'తెలుగు' },
  { code: 'mr' as Language, name: 'मराठी' },
  { code: 'ta' as Language, name: 'தமிழ்' },
  { code: 'gu' as Language, name: 'ગુજરાતી' },
  { code: 'kn' as Language, name: 'ಕನ್ನಡ' },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, isLoading: false, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}