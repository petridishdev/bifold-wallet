import { ImageBackground, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface SecondaryProps extends React.PropsWithChildren {
  source?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

const Secondary: React.FC<SecondaryProps> = ({ source, style }) => {
  const { height, backgroundColor, zIndex } = (style as ViewStyle) ?? {}

  const styles = StyleSheet.create({
    container: {
      minHeight: height,
      backgroundColor,
      zIndex,
    },
    image: {
      flex: 1,
    },
  })

  return (
    <View
      style={styles.container}
      // testID={testIdWithKey('CredentialDetailsSecondaryHeader')}
    >
      <ImageBackground source={source} style={styles.image} imageStyle={{ resizeMode: 'cover' }} />
    </View>
  )
}

export default Secondary
