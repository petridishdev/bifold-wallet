import { createContext, useContext } from 'react'

import { IColorTheme, ICredentialTheme, ITextTheme } from '@ui/types/CredentialTheme.interface'

enum GrayscaleColors {
  BLACK = '#000000',
  DARK_GREY = '#313132',
  MEDIUM_GREY = '#606060',
  LIGHT_GREY = '#D3D3D3',
  VERY_LIGHT_GREY = '#F2F2F2',
  WHITE = '#FFFFFF',
}

enum NotificationColors {
  WARN = '#313132',
  // ERROR = '#313132',
}

enum SemanticColors {
  WARN = '#FCBA19',
  ERROR = '#D8292F',
}

const color: IColorTheme = {
  brand: {
    link: GrayscaleColors.DARK_GREY,
    text: GrayscaleColors.DARK_GREY,
    background: GrayscaleColors.VERY_LIGHT_GREY,
  },
  grayscale: {
    black: GrayscaleColors.BLACK,
    darkGrey: GrayscaleColors.DARK_GREY,
    mediumGrey: GrayscaleColors.MEDIUM_GREY,
    lightGrey: GrayscaleColors.LIGHT_GREY,
    veryLightGrey: GrayscaleColors.VERY_LIGHT_GREY,
    white: GrayscaleColors.WHITE,
  },
  notification: {
    warn: NotificationColors.WARN,
    error: NotificationColors.WARN,
  },
  semantic: {
    warn: SemanticColors.WARN,
    error: SemanticColors.ERROR,
  },
}

const text: ITextTheme = {
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: color.brand.text,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.brand.text,
  },
  labelNormal: {
    fontSize: 14,
    fontWeight: 'normal',
    color: color.brand.text,
  },
  labelBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.brand.text,
  },
}

export const CredentialThemeContext = createContext<ICredentialTheme>({
  color,
  text,
})

export const useCredentialTheme = () => useContext(CredentialThemeContext)
