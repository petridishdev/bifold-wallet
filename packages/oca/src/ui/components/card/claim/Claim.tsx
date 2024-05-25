import { LocalizedAttribute } from '@oca/formatters'
import Label from '@ui/components/card/claim/Label'
import Value from '@ui/components/card/claim/Value'
import { View } from 'react-native'

export interface ClaimProps extends React.PropsWithChildren {
  attribute: LocalizedAttribute
}

const Claim: React.FC<ClaimProps> = ({ attribute }) => {
  return (
    (attribute?.label || attribute?.value) && (
      <View>
        {attribute?.label && <Label label={attribute.label} />}
        {attribute?.value && <Value value={attribute.value} />}
      </View>
    )
  )
}

export default Claim
