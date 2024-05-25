import { createContext, useContext } from 'react'

import { IColorTheme, ICredentialTheme, ITextTheme } from '@ui/types/CredentialTheme.interface'

const color: IColorTheme = {
  semantic: {
    warn: '#FCBA19',
    error: '#D8292F',
  },
  notification: {
    warn: '#313132',
    error: '#313132',
  },
  grayscale: {
    black: '#000000',
    darkGrey: '#313132',
    mediumGrey: '#606060',
    lightGrey: '#D3D3D3',
    veryLightGrey: '#F2F2F2',
    white: '#FFFFFF',
  },
}

const text: ITextTheme = {
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    // color: ColorPallet.brand.text,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: ColorPallet.brand.text,
  },
  labelNormal: {
    fontSize: 14,
    fontWeight: 'normal',
    // color: ColorPallet.brand.text,
  },
  labelBold: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: ColorPallet.brand.text,
  },
}

export const CredentialThemeContext = createContext<ICredentialTheme>({
  color,
  text,
})

export const useCredentialTheme = () => useContext(CredentialThemeContext)
