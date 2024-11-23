import HttpApi from 'i18next-http-backend'
import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
// i18nextを初期化
export async function initI18Next() {
  await i18next
    .use(HttpApi)
    .use(I18nextBrowserLanguageDetector)
    .init({
      fallbackLng: 'en', // デフォルト言語
      backend: {
        loadPath: 'assets/locales/{{lng}}/translation.json', // 翻訳ファイルのパス
      },
    })
}

export default initI18Next
