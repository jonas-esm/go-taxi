/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */

// MUI Imports
import { Changa, Poppins } from 'next/font/google'

import { deepmerge } from '@mui/utils'
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { SystemMode } from '../../@core/types'

// Core Theme Imports
import coreTheme from '../../@core/theme'

// Next Imports

const publicSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const alexFont = Changa({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800']
})

const mergedTheme = (settings: any, mode: SystemMode, direction: Theme['direction']) => {
  // Vars
  const userTheme = {
    // Write your overrides here.
    typography: {
      fontFamily: direction === 'rtl' ? alexFont.style.fontFamily : publicSans.style.fontFamily
    }
  } as Theme

  return deepmerge(coreTheme(settings, mode, direction), userTheme)
}

export default mergedTheme
