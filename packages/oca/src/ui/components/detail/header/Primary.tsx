import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

export interface PrimaryProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

const Primary: React.FC<PrimaryProps> = ({ style, children }) => {
  const { backgroundColor } = (style as ViewStyle) ?? {}

  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      flex: 1,
    },
  })

  return (
    <View
      //   testID={testIdWithKey('CredentialDetailsPrimaryHeader')}
      style={styles.container}
    >
      {children}
    </View>
  )
}

export default Primary
