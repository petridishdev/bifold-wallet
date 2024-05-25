import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import { useLocalizedCredential } from '../../../components/contexts/localizedCredential'

export interface PrimaryProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

const Primary: React.FC<PrimaryProps> = ({ style, children }) => {
  const localizedCredential = useLocalizedCredential()
  const { width, height } = style as ViewStyle
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width: width,
      minHeight: height,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor: localizedCredential?.primaryBackgroundColor,
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
