import { LocalizedAttribute } from '@oca/formatters'
import ShowAll from '@oca/ui/components/detail/body/ToggleAll'
import { useCredentialTheme } from '@oca/ui/contexts'
import { isBinaryType } from '@oca/utils'
import { HIDDEN_ATTRIBUTE_VALUE, PADDING_HORIZONTAL } from '@ui/components/detail/constants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface BodyProps extends React.PropsWithChildren {
  attributes?: LocalizedAttribute[]
}

const Body: React.FC<BodyProps> = ({ attributes }) => {
  const { t } = useTranslation()
  const { color, text } = useCredentialTheme()
  const [toggled, setToggled] = useState<Set<number>>(new Set<number>())

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: PADDING_HORIZONTAL,
    },
    labelText: {
      paddingTop: 12,
      paddingBottom: 5,
    },
    value: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    valueText: {
      paddingTop: 5,
      paddingBottom: 12,
    },
    border: {
      borderBottomWidth: 2,
      paddingVertical: 10,
      borderColor: color.brand.background,
    },
    borderBottom: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    linkText: {
      color: color.brand.link,
    },
    image: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 10,
    },
  })

  const toggle = (index: number): void => {
    if (toggled.has(index)) {
      toggled.delete(index)
    } else {
      toggled.add(index)
    }
    setToggled(new Set(toggled))
  }

  const toggleAll = (): void => {
    setToggled(new Set(Array(attributes?.length).keys()))
  }

  const toggleNone = (): void => {
    toggled.clear()
    setToggled(new Set(toggled))
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={attributes}
      ListHeaderComponent={() => (
        <ShowAll
          toggled={!!toggled.size}
          onToggleAll={(allToggled: boolean) => (allToggled ? toggleAll() : toggleNone())}
        />
      )}
      renderItem={({ item: attribute, index }) => {
        return (
          <View
            style={[styles.container, styles.border, index + 1 === attributes?.length ? styles.borderBottom : null]}
          >
            <View style={styles.value}>
              <Text style={[text.bold, styles.labelText]}>{attribute.formattedLabel}</Text>
              <Pressable
                // testID={testIdWithKey('ShowHide')}
                style={({ pressed }) => [{ opacity: +!pressed }]}
                onPress={() => toggle(index)}
                accessible={true}
                accessibilityLabel={toggled.has(index) ? t('Detail.Hide') : t('Detail.Show')}
              >
                <Text style={styles.linkText}>{toggled.has(index) ? t('Detail.Hide') : t('Detail.Show')}</Text>
              </Pressable>
            </View>
            <View>
              <Text style={[text.normal, styles.valueText]}>
                {toggled.has(index) ? (
                  isBinaryType(attribute.type) ? (
                    <Image style={styles.image} source={{ uri: attribute.value }} />
                  ) : (
                    attribute.formattedValue
                  )
                ) : (
                  HIDDEN_ATTRIBUTE_VALUE
                )}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

export default Body
