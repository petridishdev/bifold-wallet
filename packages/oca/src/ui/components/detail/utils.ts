import { StyleSheet } from 'react-native'

import { createBaseStyleSheet } from '@ui/components/common/utils'
import { MAX_HEIGHT, PADDING_HORIZONTAL, PADDING_VERTICAL } from './constants'

export const createStyleSheet = (windowWidth: number) => {
  const baseStyles = createBaseStyleSheet(windowWidth)

  const secondaryHeight = MAX_HEIGHT * 1.5

  const styles = StyleSheet.create({
    ...baseStyles,
    logo: {
      ...baseStyles.logo,
      width: MAX_HEIGHT,
      height: MAX_HEIGHT,
      top: MAX_HEIGHT,
      left: PADDING_HORIZONTAL,
    },
    secondary: {
      height: secondaryHeight,
    },
    primary: {},
    primaryChild: {
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingVertical: PADDING_VERTICAL,
    },
    issuerText: {
      paddingLeft: MAX_HEIGHT + PADDING_VERTICAL,
    },
    nameText: {
      paddingTop: PADDING_VERTICAL,
    },
    status: {
      ...baseStyles.status,
      width: MAX_HEIGHT,
      height: MAX_HEIGHT,
    },
  })

  return styles
}
