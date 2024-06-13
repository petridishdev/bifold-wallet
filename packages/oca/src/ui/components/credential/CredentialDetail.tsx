import Detail from '@oca/ui/components/detail/Detail'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'

const CredentialDetail: React.FC = () => {
  const localizedCredential = useLocalizedCredential()

  return <Detail credential={localizedCredential} />
}

export default CredentialDetail
