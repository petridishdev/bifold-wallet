import { Text, TextStyle } from 'react-native'

import { useCredentialTheme } from '@oca/ui/contexts/credentialTheme'

interface IssuerProps extends React.PropsWithChildren {
  issuer?: string
  textStyle?: TextStyle
}

const Issuer: React.FC<IssuerProps> = ({ issuer, textStyle }) => {
  const { text } = useCredentialTheme()
  const { color } = (textStyle as TextStyle) ?? {}

  return (
    <Text
      // testID={testIdWithKey('CredentialIssuer')}
      style={[
        text.labelBold,
        {
          lineHeight: 19,
          opacity: 0.8,
          color,
        },
      ]}
    >
      {issuer}
    </Text>
  )
}

export default Issuer
