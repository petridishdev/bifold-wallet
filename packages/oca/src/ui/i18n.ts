import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        Detail: {
          Show: 'Show',
          Hide: 'Hide',
          ShowAll: 'Show All',
          HideAll: 'Hide All',
        },
      },
    },
  },
})

export default i18n
