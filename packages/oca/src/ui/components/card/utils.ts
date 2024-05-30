import { StyleSheet } from 'react-native'

import { createBaseStyleSheet } from '@ui/components/common/utils'

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
  const baseStyles = createBaseStyleSheet(windowWidth)

  const padding = calculatePadding(windowWidth)
  const logoWidth = calculateLogoWidth(windowWidth)
  const logoHeight = calculateLogoHeight(windowWidth)
  const primaryWidth = calculatePrimaryWidth(windowWidth)
  const primaryHeight = calculatePrimaryHeight(windowWidth)
  const secondaryWidth = calculateSecondaryWidth(windowWidth)
  const secondaryHeight = calculateSecondaryHeight(windowWidth)

  const styles = StyleSheet.create({
    ...baseStyles,
    logo: {
      ...baseStyles.logo,
      width: logoWidth,
      height: logoHeight,
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
    status: {
      ...baseStyles.status,
      width: logoWidth,
      height: logoHeight,
    },
  })

  return styles
}
