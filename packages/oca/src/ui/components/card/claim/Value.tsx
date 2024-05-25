import { contrastColor, isDataUrl } from '@oca/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import { View, Image, Text, StyleSheet } from 'react-native'

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
