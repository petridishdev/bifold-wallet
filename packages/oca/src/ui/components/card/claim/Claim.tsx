import { View } from 'react-native'

import { DisplayAttribute } from '@oca/formatters'
import Label from '@ui/components/card/claim/Label'
import Value from '@ui/components/card/claim/Value'

export interface ClaimProps extends React.PropsWithChildren {
  attribute: DisplayAttribute
}

const Claim: React.FC<ClaimProps> = ({ attribute }) => {
  return (
    attribute?.label &&
    attribute?.value && (
      <View>
        <Label label={attribute.label} />
        <Value value={attribute.value} />
      </View>
    )
  )
}

export default Claim
