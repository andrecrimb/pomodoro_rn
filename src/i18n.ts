import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import en from '../assets/locales/en.json'

/**
 * Set the key-value pairs for the different languages that we want to support.
 *
 *  We could have created different json files for specific type of information
 *  eg. toast.json for toast messages, common.json, dialog.json and etc...
 * But for the sake of this assignment one file will be enough
 */
i18n.translations = { en }

// Set the locale once at the beginning of the app.
i18n.locale = Localization.locale
/**
 * When a value is missing from a language it'll fallback to another language with the key present.
 * but for the sake of this assignment we will support only english
 */
i18n.fallbacks = true

export default i18n
