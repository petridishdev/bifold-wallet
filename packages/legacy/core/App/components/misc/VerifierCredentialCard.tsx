import { BrandingOverlay } from '@hyperledger/aries-oca'
import { Attribute, CredentialOverlay, Predicate, Field } from '@hyperledger/aries-oca/build/legacy'
import startCase from 'lodash.startcase'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useWindowDimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import ImageModal from '../../components/modals/ImageModal'
import { TOKENS, useContainer } from '../../container-api'
import { useTheme } from '../../contexts/theme'
import { toImageSource } from '../../utils/credential'
import { formatIfDate, isDataUrl, pTypeToText } from '../../utils/helpers'
import { testIdWithKey } from '../../utils/testable'

import CardWatermark from './CardWatermark'

interface VerifierCredentialCardProps {
  style?: ViewStyle
  displayItems?: Field[]
  elevated?: boolean
  credDefId?: string
  schemaId: string
  preview?: boolean
  onChangeValue?: (schema: string, label: string, name: string, value: string) => void
}

/**
 * This component is meant to be used in the ProofRequestDetails screen to show what
 * a proof request will look like with proper branding etc. and allow for the changing
 * of predicate values. It is a greatly trimmed-down version of the CredentialCard11.
 */
const VerifierCredentialCard: React.FC<VerifierCredentialCardProps> = ({
  style = {},
  displayItems = [],
  elevated = false,
  credDefId,
  schemaId,
  preview,
  onChangeValue,
}) => {
  const { width } = useWindowDimensions()
  const borderRadius = 10
  const padding = width * 0.05
  const logoHeight = width * 0.12
  const [dimensions, setDimensions] = useState({ cardWidth: 0, cardHeight: 0 })
  const { i18n, t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const bundleResolver = useContainer().resolve(TOKENS.UTIL_LEGACY_OCA_RESOLVER)
  const [overlay, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({})

  const attributeTypes = overlay.bundle?.captureBase.attributes
  const attributeFormats: Record<string, string | undefined> = (overlay.bundle as any)?.bundle.attributes
    .map((attr: any) => {
      return { name: attr.name, format: attr.format }
    })
    .reduce((prev: { [key: string]: string }, curr: { name: string; format?: string }) => {
      return { ...prev, [curr.name]: curr.format }
    }, {})

  const styles = StyleSheet.create({
    container: {
      backgroundColor: overlay.brandingOverlay?.primaryBackgroundColor,
      borderRadius: borderRadius,
    },
    cardContainer: {
      flexDirection: 'row',
      minHeight: 0.33 * width,
    },
    secondaryBodyContainer: {
      width: logoHeight,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: overlay.brandingOverlay?.primaryBackgroundColor,
    },
    primaryBodyContainer: {
      flex: 1,
      padding,
      marginLeft: -1 * logoHeight + padding,
    },
    imageAttr: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    logoContainer: {
      top: padding,
      left: -1 * logoHeight + padding,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
    },
    textContainer: {
      color: TextTheme.normal.color,
      flexShrink: 1,
    },
  })

  const parseAttribute = (item: (Attribute & Predicate) | undefined) => {
    let parsedItem = item
    if (item && !item.value) {
      parsedItem = pTypeToText(item, t, attributeTypes) as Attribute & Predicate
    }
    const parsedValue = formatIfDate(
      attributeFormats?.[item?.name ?? ''],
      parsedItem?.value ?? parsedItem?.pValue ?? null
    )
    return {
      label: item?.label ?? item?.name ?? '',
      value: item?.value ? parsedValue : `${parsedItem?.pType} ${parsedValue}`,
    }
  }

  useEffect(() => {
    const params = {
      identifiers: { schemaId, credentialDefinitionId: credDefId },
      attributes: displayItems,
      language: i18n.language,
    }
    bundleResolver.resolveAllBundles(params).then((bundle) => {
      setOverlay({
        ...overlay,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay as BrandingOverlay,
      })
    })
  }, [credDefId, schemaId])

  const CredentialCardLogo: React.FC = () => {
    return (
      <View style={[styles.logoContainer, { elevation: elevated ? 5 : 0 }]}>
        {overlay.brandingOverlay?.logo ? (
          <Image
            source={toImageSource(overlay.brandingOverlay?.logo)}
            style={{
              resizeMode: 'cover',
              width: logoHeight,
              height: logoHeight,
              borderRadius: 8,
            }}
          />
        ) : (
          <Text
            style={[
              TextTheme.bold,
              {
                fontSize: 0.5 * logoHeight,
                alignSelf: 'center',
                color: '#000',
              },
            ]}
          >
            {(overlay.metaOverlay?.name ?? overlay.metaOverlay?.issuer ?? 'C')?.charAt(0).toUpperCase()}
          </Text>
        )}
      </View>
    )
  }

  const AttributeItem: React.FC<{ item: Attribute }> = ({ item }) => {
    const label = (item.name || item.label)!
    const ylabel = overlay.bundle?.labelOverlay?.attributeLabels[label] ?? startCase(label)
    const [value, setValue] = useState(item.value)
    const [showImageModal, setShowImageModal] = useState(false)

    useEffect(() => {
      setValue(formatIfDate(item.format, value))
    }, [])

    return (
      <View>
        <Text
          style={[
            TextTheme.labelSubtitle,
            styles.textContainer,
            {
              lineHeight: 19,
              opacity: 0.8,
            },
          ]}
          testID={testIdWithKey('AttributeName')}
        >
          {ylabel}
        </Text>
        {value && (
          <View>
            {isDataUrl(value) ? (
              <TouchableOpacity
                accessibilityLabel={t('Record.Zoom')}
                testID={testIdWithKey('zoom')}
                onPress={() => setShowImageModal(true)}
              >
                <Image style={styles.imageAttr} source={{ uri: value as string }} />
              </TouchableOpacity>
            ) : (
              <Text style={[TextTheme.bold, styles.textContainer]} testID={testIdWithKey('AttributeValue')}>
                {value}
              </Text>
            )}
          </View>
        )}
        {showImageModal && <ImageModal uri={value as string} onDismissPressed={() => setShowImageModal(false)} />}
      </View>
    )
  }

  const PredicateItem: React.FC<{
    item: Predicate
  }> = ({ item }) => {
    const { ColorPallet } = useTheme()
    const label = (item.label || item.name)!
    const ylabel = overlay.bundle?.labelOverlay?.attributeLabels[label] ?? startCase(label)
    const [currentValue, setCurrentValue] = useState(`${item.pValue ?? ''}`)

    const predicateStyles = StyleSheet.create({
      input: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        borderBottomColor: ColorPallet.grayscale.black,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1,
        lineHeight: 19,
        padding: 0,
      },
      predicateLabel: {
        lineHeight: 19,
        opacity: 0.8,
      },
      predicateType: {
        lineHeight: 19,
        marginRight: 5,
      },
    })

    return (
      <View>
        <Text
          style={[TextTheme.labelSubtitle, styles.textContainer, predicateStyles.predicateLabel]}
          testID={testIdWithKey('PredicateName')}
        >
          {ylabel}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Text style={[TextTheme.bold, styles.textContainer, predicateStyles.predicateType]}>{item.pType}</Text>
          {/* Only allow editing parametrizable predicates in preview mode */}
          {item.parameterizable && preview && onChangeValue ? (
            <TextInput
              keyboardType="numeric"
              style={[TextTheme.bold, predicateStyles.input]}
              onChangeText={(value) => setCurrentValue(value)}
              onBlur={() => {
                onChangeValue(schemaId, item.label || item.name || '', item.name || '', currentValue)
              }}
              testID={testIdWithKey('PredicateInput')}
            >
              {currentValue}
            </TextInput>
          ) : (
            <Text style={[TextTheme.bold, styles.textContainer]} testID={testIdWithKey('PredicateValue')}>
              {item.pValue}
            </Text>
          )}
        </View>
      </View>
    )
  }

  const CardAttribute: React.FC<{ item: Attribute & Predicate }> = ({ item }) => {
    item.format = attributeFormats?.[item.name ?? '']
    let parsedPredicate: Predicate | undefined = undefined
    if (item instanceof Predicate) {
      parsedPredicate = pTypeToText(item, t, attributeTypes) as Predicate
      if (!parsedPredicate.parameterizable) {
        parsedPredicate.pValue = formatIfDate(parsedPredicate.format, parsedPredicate.pValue)
      }
    }

    return (
      <View style={{ marginTop: 15 }}>
        {item instanceof Attribute && <AttributeItem item={item as Attribute} />}
        {item instanceof Predicate && <PredicateItem item={parsedPredicate as Predicate} />}
      </View>
    )
  }

  const renderCardAttribute = (item: Attribute & Predicate) => {
    return <CardAttribute item={item} />
  }

  const CredentialCardPrimaryBody: React.FC = () => {
    return (
      <View testID={testIdWithKey('CredentialCardPrimaryBody')} style={styles.primaryBodyContainer}>
        <View>
          {!(overlay.metaOverlay?.issuer === 'Unknown Contact') && (
            <View style={{ flexDirection: 'row' }}>
              <Text
                testID={testIdWithKey('CredentialIssuer')}
                style={[
                  TextTheme.label,
                  styles.textContainer,
                  {
                    lineHeight: 19,
                    opacity: 0.8,
                    flex: 1,
                    flexWrap: 'wrap',
                  },
                ]}
              >
                {overlay.metaOverlay?.issuer}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: 'row' }}>
            <Text
              testID={testIdWithKey('CredentialName')}
              style={[
                TextTheme.bold,
                styles.textContainer,
                {
                  lineHeight: 24,
                  flex: 1,
                  flexWrap: 'wrap',
                  color: styles.textContainer.color,
                },
              ]}
            >
              {overlay.metaOverlay?.name}
            </Text>
          </View>
        </View>
        <FlatList
          data={displayItems}
          scrollEnabled={false}
          initialNumToRender={displayItems?.length}
          keyExtractor={(item) => item.name!}
          renderItem={({ item }) => {
            return renderCardAttribute(item as Attribute & Predicate)
          }}
        />
      </View>
    )
  }

  const CredentialCardSecondaryBody: React.FC = () => {
    return (
      <View testID={testIdWithKey('CredentialCardSecondaryBody')} style={styles.secondaryBodyContainer}>
        {overlay.brandingOverlay?.backgroundImageSlice && !displayItems ? (
          <ImageBackground
            source={toImageSource(overlay.brandingOverlay?.backgroundImageSlice)}
            style={{ flexGrow: 1 }}
            imageStyle={{
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius,
            }}
          >
            {null}
          </ImageBackground>
        ) : null}
      </View>
    )
  }

  const CredentialCard: React.FC = () => {
    return (
      <View
        style={styles.cardContainer}
        accessible={true}
        accessibilityLabel={
          `${overlay.metaOverlay?.issuer ? `${t('Credentials.IssuedBy')} ${overlay.metaOverlay?.issuer}` : ''}, ${
            overlay.metaOverlay?.watermark ?? ''
          } ${overlay.metaOverlay?.name ?? ''} ${t('Credentials.Credential')}.` +
          displayItems.map((item) => {
            const { label, value } = parseAttribute(item as (Attribute & Predicate) | undefined)
            if (label) {
              return value ? ` ${label}, ${value}` : ` ${label}`
            }
          })
        }
      >
        <CredentialCardSecondaryBody />
        <CredentialCardLogo />
        <CredentialCardPrimaryBody />
      </View>
    )
  }

  return overlay.bundle ? (
    <View
      style={[styles.container, style, { elevation: elevated ? 5 : 0, overflow: 'hidden' }]}
      onLayout={(event) => {
        setDimensions({ cardHeight: event.nativeEvent.layout.height, cardWidth: event.nativeEvent.layout.width })
      }}
    >
      <View testID={testIdWithKey('CredentialCard')}>
        {overlay.metaOverlay?.watermark && (
          <CardWatermark
            width={dimensions.cardWidth}
            height={dimensions.cardHeight}
            style={{ color: ColorPallet.grayscale.mediumGrey }}
            watermark={overlay.metaOverlay?.watermark}
          />
        )}
        <CredentialCard />
      </View>
    </View>
  ) : null
}

export default VerifierCredentialCard
