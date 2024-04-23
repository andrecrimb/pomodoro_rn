import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import en from '../assets/locales/en.json'

const i18n = new I18n({ en })

/**
 * Set the key-value pairs for the different languages that we want to support.
 *
 *  We could have created different json files for specific type of information
 *  eg. toast.json for toast messages, common.json, dialog.json and etc...
 * But for the sake of this assignment one file will be enough
 */

// Set the locale once at the beginning of the app.
i18n.locale = Localization.getLocales()[0].languageCode || 'en'
/**
 * When a value is missing from a language it'll fallback to another language with the key present.
 * but for the sake of this assignment we will support only english
 */
i18n.enableFallback = true

export default i18n
