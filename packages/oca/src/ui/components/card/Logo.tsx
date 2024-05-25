import { View, Image, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import { toImageSource } from '@oca/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'

export interface LogoProps extends React.PropsWithChildren {
  source?: unknown
  label?: string
  elevation?: number
  style?: StyleProp<ViewStyle>
}

const Logo: React.FC<LogoProps> = ({ source, label = 'Credential', elevation = 0, style }) => {
  const { text } = useCredentialTheme()

  const { width, height, position, top, left } = style as ViewStyle
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width,
      height,
      position,
      top,
      left,
      borderRadius,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      zIndex: 2,
    },
    image: {
      width,
      height,
      resizeMode: 'cover',
      borderRadius: 8,
    },
    text: {
      fontSize: 0.5 * (width as number),
      alignSelf: 'center',
      color: '#000',
    },
  })

  return (
    <View style={[styles.container, { elevation }]}>
      {source ? (
        <Image source={toImageSource(source)} style={styles.image} />
      ) : (
        <Text style={[text.bold, styles.text]}>{label.charAt(0).toUpperCase()}</Text>
      )}
    </View>
  )
}

export default Logo
