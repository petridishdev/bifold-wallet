import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

export interface PrimaryProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

const Primary: React.FC<PrimaryProps> = ({ style, children }) => {
  const { width, height, backgroundColor } = style as ViewStyle
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width,
      minHeight: height,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor,
      flex: 1,
    },
  })

  return (
    <View
      // testID={testIdWithKey('CredentialCardPrimaryBody')}
      style={styles.container}
    >
      {children}
    </View>
  )
}

export default Primary
