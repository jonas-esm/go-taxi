import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: false
  //   i18n: {
  //     locales: ['default', 'en', 'nl', 'ar'], // Add your supported languages
  //     defaultLocale: 'en', // Default language
  //     localeDetection: false // Enable automatic locale detection
  //   }
  //   i18n: {
  //     locales: ['en', 'fr'], // Add your supported locales
  //     defaultLocale: 'en', // Set the default locale
  //     localeDetection: false // Enable automatic locale detection
  //   }
}

export default withNextIntl(nextConfig)
