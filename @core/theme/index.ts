// Next Imports
import { Poppins, Alexandria } from 'next/font/google'

// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { SystemMode, Skin } from '../../@core/types'

// Theme Options Imports
import overrides from './overrides'
import spacing from './spacing'
import shadows from './shadows'
import customShadows from './customShadows'
import typography from './typography'

// const public_sans = Public_Sans({
//     subsets: ["latin"],
//     weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const alexFont = Alexandria({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const theme = (settings: any, mode: SystemMode, direction: Theme['direction']): Theme => {
  return {
    direction,
    components: overrides(settings.skin as Skin),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(),
    typography: typography(direction === 'rtl' ? alexFont.style.fontFamily : poppins.style.fontFamily),
    customShadows: customShadows(mode),
    mainColorChannels: {
      light: '47 43 61',

      // dark: "225 222 245",
      lightShadow: '47 43 61',
      darkShadow: '19 17 32'
    }
  } as Theme
}

export default theme
