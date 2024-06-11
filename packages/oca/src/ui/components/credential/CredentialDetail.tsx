import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import Detail from '@oca/ui/components/detail/Detail'

const CredentialDetail: React.FC = () => {
  const localizedCredential = useLocalizedCredential()

  return <Detail credential={localizedCredential} />
}

export default CredentialDetail
