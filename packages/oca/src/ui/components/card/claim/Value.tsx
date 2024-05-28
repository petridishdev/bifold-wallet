import { isDataUrl } from '@oca/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { View, Image, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'

const borderRadius = 10

interface ValueProps extends React.PropsWithChildren {
  value: string
  textStyle?: StyleProp<TextStyle>
}

const Value: React.FC<ValueProps> = ({ value, textStyle }) => {
  const { color } = (textStyle as TextStyle) ?? {}
  const { text } = useCredentialTheme()

  const styles = StyleSheet.create({
    container: {
      color,
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
