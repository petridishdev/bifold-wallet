import { useCredentialTheme } from '@oca/ui/contexts'
import { useTranslation } from 'react-i18next'
import { Text, View, StyleSheet, Pressable } from 'react-native'

import { PADDING_HORIZONTAL, PADDING_VERTICAL } from '@ui/components/detail/constants'

interface ToggleAllProps extends React.PropsWithChildren {
  toggled?: boolean
  onToggleAll?: (toggled: boolean) => void
}

const ToggleAll: React.FC<ToggleAllProps> = ({ toggled = false, onToggleAll = () => false }) => {
  const { t } = useTranslation()
  const { color, text } = useCredentialTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginHorizontal: PADDING_HORIZONTAL,
      paddingVertical: PADDING_VERTICAL,
    },
    link: {
      paddingVertical: 2,
    },
    linkText: {
      color: color.brand.link,
    },
  })

  const toggle = (): void => {
    onToggleAll(!toggled)
  }

  return (
    <View style={styles.container}>
      <Pressable
        // testID={testIdWithKey('ToggleAll')}
        style={({ pressed }) => [styles.link, { opacity: +!pressed }]}
        onPress={() => toggle()}
        accessible={true}
        accessibilityLabel={toggled ? t('Detail.HideAll') : t('Detail.ShowAll')}
      >
        <Text style={[text.labelNormal, styles.linkText]}>{toggled ? t('Detail.HideAll') : t('Detail.ShowAll')}</Text>
      </Pressable>
    </View>
  )
}

export default ToggleAll
