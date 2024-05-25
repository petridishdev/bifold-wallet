import { View, ImageBackground, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import { toImageSource } from '@oca/utils'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'

export interface SecondaryProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

export const Secondary: React.FC<SecondaryProps> = ({ style }) => {
  const localizedCredential = useLocalizedCredential()
  const { width, height } = style as ViewStyle
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width: width as number,
      minHeight: height as number,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: localizedCredential?.secondaryBackgroundColor ?? localizedCredential?.primaryBackgroundColor,
      zIndex: +!!(localizedCredential?.backgroundImageSlice ?? localizedCredential?.secondaryBackgroundColor),
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
        source={toImageSource(localizedCredential?.backgroundImageSlice)}
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
