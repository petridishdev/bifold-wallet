import { useCredentialTheme } from '@oca/ui/contexts/credentialTheme'
import { StyleProp, Text, TextStyle } from 'react-native'

interface NameProps extends React.PropsWithChildren {
  name?: string
  textStyle?: StyleProp<TextStyle>
}

const Name: React.FC<NameProps> = ({ name, textStyle }) => {
  const { text } = useCredentialTheme()
  const { color } = textStyle as TextStyle

  return (
    <Text
      // testID={testIdWithKey('CredentialName')}
      style={[
        text.bold,
        {
          lineHeight: 24,
          color,
        },
      ]}
    >
      {name}
    </Text>
  )
}

export default Name
