import { StyleProp, TextStyle } from 'react-native'

interface ISemanticColors {
  warn: string
  error: string
}

interface INotificationColors {
  warn: string
  error: string
}

interface IGrayscaleColors {
  black: string
  darkGrey: string
  mediumGrey: string
  lightGrey: string
  veryLightGrey: string
  white: string
}

export interface IBrandColors {
  link: string
  text: string
  background: string
}

export interface IColorTheme {
  brand: IBrandColors
  grayscale: IGrayscaleColors
  notification: INotificationColors
  semantic: ISemanticColors
}

export interface ITextTheme {
  normal: StyleProp<TextStyle>
  bold: StyleProp<TextStyle>
  labelNormal: StyleProp<TextStyle>
  labelBold: StyleProp<TextStyle>
}

export interface ICredentialTheme {
  color: IColorTheme
  text: ITextTheme
}
