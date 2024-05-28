import { StyleSheet } from 'react-native'
import { PADDING_RATIO, LOGO_RATIO, PRIMARY_RATIO, HEIGHT_RATIO, SECONDARY_RATIO } from './constants'

export const calculatePadding = (width: number): number => {
  return PADDING_RATIO * width
}

export const calculateLogoWidth = (width: number): number => {
  return LOGO_RATIO * width
}

export const calculateLogoHeight = (width: number): number => {
  return LOGO_RATIO * width
}

export const calculatePrimaryWidth = (width: number): number => {
  return PRIMARY_RATIO * width
}

export const calculatePrimaryHeight = (width: number): number => {
  return HEIGHT_RATIO * width
}

export const calculateSecondaryWidth = (width: number): number => {
  return SECONDARY_RATIO * width
}

export const calculateSecondaryHeight = (width: number): number => {
  return HEIGHT_RATIO * width
}

export const createStyleSheet = (windowWidth: number) => {
  const padding = calculatePadding(windowWidth)
  const logoWidth = calculateLogoWidth(windowWidth)
  const logoHeight = calculateLogoHeight(windowWidth)
  const primaryWidth = calculatePrimaryWidth(windowWidth)
  const primaryHeight = calculatePrimaryHeight(windowWidth)
  const secondaryWidth = calculateSecondaryWidth(windowWidth)
  const secondaryHeight = calculateSecondaryHeight(windowWidth)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
    },
    logo: {
      width: logoWidth,
      height: logoHeight,
      position: 'absolute',
      top: padding,
      left: padding,
    },
    secondary: {
      width: secondaryWidth,
      height: secondaryHeight,
    },
    primary: {
      width: primaryWidth,
      height: primaryHeight,
    },
    primaryChild: {
      padding: padding,
      paddingLeft: 2 * padding,
      paddingRight: padding + logoWidth,
    },
    issuerText: {},
    nameText: {},
    claimText: {},
    watermark: {
      width: windowWidth,
      height: windowWidth,
    },
    watermarkText: {
      fontSize: 0.05 * (windowWidth as number),
      opacity: 0.16,
    },
    status: {
      width: logoWidth,
      height: logoHeight,
      position: 'absolute',
      top: 0,
      right: 0,
    },
  })

  return styles
}
