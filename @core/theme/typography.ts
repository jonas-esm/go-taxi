// MUI Imports
import type { Theme } from '@mui/material/styles'

const typography = (fontFamily: string): Theme['typography'] =>
  ({
    fontFamily:
      typeof fontFamily === 'undefined' || fontFamily === ''
        ? [
            '"Public Sans"',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(',')
        : fontFamily,
    fontSize: 13.125,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.25
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.25
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.25
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.25
    },
    h5: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.25
    },
    h6: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.46667
    },
    subtitle1: {
      fontSize: '0.9375rem',
      lineHeight: 1.46667
    },
    subtitle2: {
      fontSize: '0.8125rem',
      fontWeight: 400,
      lineHeight: 1.53846154
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.46667
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.53846154
    },
    button: {
      fontSize: '0.9375rem',
      lineHeight: 1.46667,
      textTransform: 'none'
    },
    caption: {
      fontSize: '0.8125rem',
      lineHeight: 1.3846154,
      letterSpacing: '0.4px'
    },
    overline: {
      fontSize: '0.75rem',
      lineHeight: 1.16667,
      letterSpacing: '0.8px'
    }
  }) as Theme['typography']

export default typography
