import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import Card from '@ui/components/card/Card'

const CredentialCard: React.FC = () => {
  const localizedCredential = useLocalizedCredential()

  return <Card credential={localizedCredential} />
}

export default CredentialCard
