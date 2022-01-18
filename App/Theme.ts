import { StyleSheet, TextStyle } from 'react-native'

interface ColorTheme {
  mainColor: string
  activeMain: string
  textColor: string
  backgroundColor: string
  shadow: string
  green: string
  red: string
  white: string
  transparent: string
  borderLightBlue: string
  backgroundLightBlue: string
  accent: string
}

interface FontAttributes {
  fontSize: number
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color: string
}

interface TextTheme {
  headingOne: FontAttributes
  headingTwo: FontAttributes
  headingThree: FontAttributes
  headingFour: FontAttributes
  normal: FontAttributes
  label: FontAttributes
  caption: FontAttributes
}

export const Colors: ColorTheme = {
  mainColor: '#003366',
  activeMain: '#003366B3',
  textColor: '#313132',
  backgroundColor: '#F2F2F2',
  shadow: '#1c1c1e',
  white: '#ffffff',
  green: '#2d6e35',
  red: '#de3333',
  transparent: '#FFFFFF00',
  borderLightBlue: '#B9CEDE',
  backgroundLightBlue: '#D9EAF7',
  accent: '#FCBA19',
}

export const TextTheme: TextTheme = {
  headingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  headingTwo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  headingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  headingFour: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: Colors.textColor,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.textColor,
  },
}

export const Buttons = StyleSheet.create({
  primary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: Colors.mainColor,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
})
