import { View, ImageBackground, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'

export interface SecondaryProps extends React.PropsWithChildren {
  source?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  tint?: boolean
}

export const Secondary: React.FC<SecondaryProps> = ({ source, style, tint = false }) => {
  const { width, height, backgroundColor, zIndex } = (style as ViewStyle) ?? {}
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width,
      minHeight: height,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor,
      zIndex,
    },
    tintContainer: {
      backgroundColor: 'rgba(0,0,0,0.24)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    image: {
      flex: 1,
    },
  })

  return (
    <View
      // testID={testIdWithKey('CredentialCardSecondaryBody')}
      style={styles.container}
    >
      <View style={tint ? styles.tintContainer : null} />
      {source && (
        <ImageBackground
          source={source}
          style={styles.image}
          imageStyle={{
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          }}
        />
      )}
    </View>
  )
}

export default Secondary
