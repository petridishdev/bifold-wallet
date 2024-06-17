import Detail from '@oca/ui/components/detail/Detail'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'

import { I18nextProvider } from 'react-i18next'
import { i18n } from 'i18next'
import { initi18n } from '@oca/ui/i18n'

interface CredentialDetailProps extends React.PropsWithChildren {
  i18n?: i18n
}

const CredentialDetail: React.FC<CredentialDetailProps> = ({ i18n }) => {
  const localizedCredential = useLocalizedCredential()

  if (!i18n) {
    i18n = initi18n()
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Detail credential={localizedCredential} />
    </I18nextProvider>
  )
}

export default CredentialDetail
