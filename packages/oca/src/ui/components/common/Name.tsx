import { StyleProp, Text, TextStyle } from 'react-native'

import { useCredentialTheme } from '@oca/ui/contexts/credentialTheme'

interface NameProps extends React.PropsWithChildren {
  name?: string
  textStyle?: StyleProp<TextStyle>
}

const Name: React.FC<NameProps> = ({ name, textStyle }) => {
  const { text } = useCredentialTheme()
  const { color, fontWeight, paddingTop } = (textStyle as TextStyle) ?? {}

  return (
    <Text
      // testID={testIdWithKey('CredentialName')}
      style={[
        text.normal,
        {
          paddingTop,
          lineHeight: 24,
          color,
          fontWeight,
        },
      ]}
    >
      {name}
    </Text>
  )
}

export default Name
