import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        doctors: "Doctors",
        services: "Services",
        appointments: "Appointments",
        about: "About",
        contact: "Contact",
      },
    },

    hi: {
      translation: {
        home: "होम",
        doctors: "डॉक्टर",
        services: "सेवाएं",
        appointments: "अपॉइंटमेंट",
        about: "हमारे बारे में",
        contact: "संपर्क",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",
});

export default i18n;