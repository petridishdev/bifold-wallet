import { toImageSource } from '@oca/utils'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import { View, ImageBackground, StyleSheet, StyleProp, ViewStyle } from 'react-native'

export interface SecondaryProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

export const Secondary: React.FC<SecondaryProps> = ({ style }) => {
  const localizedCredential = useLocalizedCredential()
  const { width, height, backgroundColor } = style as ViewStyle ?? {}
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width,
      minHeight: height,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: backgroundColor ?? localizedCredential?.secondaryBackgroundColor ?? localizedCredential?.primaryBackgroundColor,
      zIndex: +!!(backgroundColor ?? localizedCredential?.backgroundImageSlice ?? localizedCredential?.secondaryBackgroundColor),
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
      {/* Specified background color prop overrides the image slice */}
      {!backgroundColor && <ImageBackground
        source={toImageSource(localizedCredential?.backgroundImageSlice)}
        style={styles.image}
        imageStyle={{
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      />}
    </View>
  )
}

export default Secondary
