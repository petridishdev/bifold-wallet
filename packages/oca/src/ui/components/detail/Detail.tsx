import { LocalizedCredential } from '@oca/formatters'
import { View } from 'react-native'
import Header from '@ui/components/detail/header/Header'
import Body from '@ui/components/detail/body/Body'
import { I18nextProvider } from 'react-i18next'
import i18n from '@oca/ui/i18n'

interface DetailProps {
  connectionId?: string
  credentialId?: string
  credential?: LocalizedCredential
}

const Detail: React.FC<DetailProps> = ({ connectionId, credentialId, credential }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <View>
        <Header connectionId={connectionId} credentialId={credentialId} credential={credential} />
        <Body attributes={credential?.attributes} />
      </View>
    </I18nextProvider>
  )
}

export default Detail
