import { LocalizedCredential } from '@oca/formatters'
import { View } from 'react-native'
import Header from '@ui/components/detail/header/Header'
import Body from '@ui/components/detail/body/Body'

interface DetailProps extends React.PropsWithChildren {
  connectionId?: string
  credentialId?: string
  credential?: LocalizedCredential
}

const Detail: React.FC<DetailProps> = ({ connectionId, credentialId, credential }) => {
  return (
    <View>
      <Header connectionId={connectionId} credentialId={credentialId} credential={credential} />
      <Body attributes={credential?.attributes} />
    </View>
  )
}

export default Detail
