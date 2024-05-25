import { View, Image, Text, StyleSheet } from 'react-native'

import { useCredentialTheme } from '../../../contexts/credentialTheme'
import { useLocalizedCredential } from '../../../contexts/localizedCredential'
import { contrastColor, isDataUrl } from '../../../../utils'

const borderRadius = 10

interface ValueProps extends React.PropsWithChildren {
  value: string
}

const Value: React.FC<ValueProps> = ({ value }) => {
  const { text } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()

  const styles = StyleSheet.create({
    container: {
      color: contrastColor(localizedCredential?.primaryBackgroundColor),
      flexShrink: 1,
    },
    image: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius,
    },
  })

  return (
    <View>
      {isDataUrl(value) ? (
        <Image style={styles.image} source={{ uri: value as string }}></Image>
      ) : (
        <Text
          style={[
            text.bold,
            styles.container,
            {
              lineHeight: 24,
            },
          ]}
          // testID={testIdWithKey('AttributeValue')}
        >
          {value}
        </Text>
      )}
    </View>
  )
}

export default Value
