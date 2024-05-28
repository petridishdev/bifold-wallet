import { View, ImageBackground, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'

export interface SecondaryProps extends React.PropsWithChildren {
  source?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

export const Secondary: React.FC<SecondaryProps> = ({ source, style }) => {
  const { width, height, backgroundColor, zIndex } = style as ViewStyle
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
    image: {
      flex: 1,
    },
  })

  return (
    <View
      // testID={testIdWithKey('CredentialCardSecondaryBody')}
      style={[styles.container]}
    >
      <ImageBackground
        source={source}
        style={styles.image}
        imageStyle={{
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      />
    </View>
  )
}

export default Secondary
