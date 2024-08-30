import startCase from 'lodash.startcase'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

import { useCredentialTheme } from '@ui/contexts/credentialTheme'

interface LabelProps extends React.PropsWithChildren {
  label: string
  textStyle?: StyleProp<TextStyle>
}

const Label: React.FC<LabelProps> = ({ label, textStyle }) => {
  const { color } = (textStyle as TextStyle) ?? {}
  const { text } = useCredentialTheme()

  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      color,
      flexShrink: 1,
    },
  })

  return (
    <Text
      style={[
        text.labelNormal,
        styles.container,
        {
          lineHeight: 19,
          opacity: 0.8,
        },
      ]}
      // testID={testIdWithKey('AttributeName')}
    >
      {label ?? startCase(label)}
    </Text>
  )
}

export default Label
