import Card from '@ui/components/card/Card'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'

const CredentialCard: React.FC = () => {
  const localizedCredential = useLocalizedCredential()

  return <Card credential={localizedCredential} />
}

export default CredentialCard
