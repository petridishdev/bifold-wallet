import { StyleSheet } from 'react-native'

export const createBaseStyleSheet = (windowWidth: number) => {
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    logo: {
      position: 'absolute',
    },
    watermark: {
      width: windowWidth,
      height: windowWidth,
    },
    watermarkText: {
      fontSize: 0.05 * (windowWidth as number),
      opacity: 0.16,
    },
    status: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  })

  return styles
}
