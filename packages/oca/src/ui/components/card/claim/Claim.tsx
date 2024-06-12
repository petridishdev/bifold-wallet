import { StyleProp, TextStyle, View } from 'react-native'

import { LocalizedAttribute } from '@oca/formatters'
import Label from '@ui/components/card/claim/Label'
import Value from '@ui/components/card/claim/Value'

export interface ClaimProps extends React.PropsWithChildren {
  attribute: LocalizedAttribute
  textStyle?: StyleProp<TextStyle>
}

const Claim: React.FC<ClaimProps> = ({ attribute, textStyle }) => {
  return (
    (attribute?.label || attribute?.value) && (
      <View>
        {attribute?.formattedLabel && <Label label={attribute.formattedLabel} textStyle={textStyle} />}
        {attribute?.formattedValue && <Value value={attribute.formattedValue} textStyle={textStyle} />}
      </View>
    )
  )
}

export default Claim
