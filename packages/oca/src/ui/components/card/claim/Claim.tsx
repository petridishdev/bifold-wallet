import { View } from 'react-native'

import { DisplayAttribute } from '../../../../formatters'

import Label from './Label'
import Value from './Value'

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
