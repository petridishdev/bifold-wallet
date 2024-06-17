import { ImageBackground, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface SecondaryProps extends React.PropsWithChildren {
  source?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  tint?: boolean
}

const Secondary: React.FC<SecondaryProps> = ({ source, style, tint = false }) => {
  const { height, backgroundColor, zIndex } = (style as ViewStyle) ?? {}

  const styles = StyleSheet.create({
    container: {
      minHeight: height,
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
    // testID={testIdWithKey('CredentialDetailsSecondaryHeader')}
      style={styles.container}
    >
      <View style={tint ? styles.tintContainer : null} />
      {source && <ImageBackground source={source} style={styles.image} imageStyle={{ resizeMode: 'cover' }} />}
    </View>
  )
}

export default Secondary
