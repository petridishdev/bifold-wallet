import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds'
import { CredentialExchangeRecord, CredentialState } from '@credo-ts/core'
import { useCredentialByState } from '@credo-ts/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { useIsFocused } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity, View } from 'react-native'

import { useConfiguration } from '../contexts/configuration'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { useTour } from '../contexts/tour/tour-context'
import { CredentialStackParams, Screens } from '../types/navigators'
import { TourID } from '../types/tour'
import { TOKENS, useContainer } from '../container-api'
import { getCredentialConnectionLabel } from '../utils/helpers'
import { getCredentialIdentifiers } from '../utils/credential'
import { testIdWithKey } from '../utils/testable'
import { OverlayBundle } from '@hyperledger/aries-oca'
import { LocalizedCredentialContext } from '@hyperledger/aries-oca/build/ui/contexts'
import { CredentialCard } from '@hyperledger/aries-oca/build/ui/components'
import { LocalizedCredential } from '@hyperledger/aries-oca/build/formatters'

const ListCredential: React.FC<{ credential: CredentialExchangeRecord }> = ({ credential }) => {
  const credentialConnectionLabel = getCredentialConnectionLabel(credential)
  const { i18n, t } = useTranslation()
  const bundleResolver = useContainer().resolve(TOKENS.UTIL_OCA_RESOLVER)
  const [bundle, setBundle] = useState<OverlayBundle>()
  const navigation = useNavigation<StackNavigationProp<CredentialStackParams>>()

  useEffect(() => {
    bundleResolver
      .resolveDefaultBundle({
        identifiers: getCredentialIdentifiers(credential),
        metadata: {
          connectionId: credential?.connectionId,
          connectionAlias: credentialConnectionLabel,
        },
        language: i18n.language,
      })
      .then(setBundle)
  }, [credential, i18n.language])

  const onPress = () => navigation.navigate(Screens.CredentialDetails, { credential })

  return bundle ? (
    <TouchableOpacity
      accessible={false}
      accessibilityLabel={typeof onPress === 'undefined' ? undefined : t('Credentials.CredentialDetails')}
      disabled={typeof onPress === 'undefined' ? true : false}
      onPress={onPress}
      testID={testIdWithKey('ShowCredentialDetails')}
    >
      <LocalizedCredentialContext.Provider value={new LocalizedCredential(bundle, credential, i18n.language)}>
        <CredentialCard />
      </LocalizedCredentialContext.Provider>
    </TouchableOpacity>
  ) : null
}

const ListCredentials: React.FC = () => {
  const { t } = useTranslation()
  const [store, dispatch] = useStore()
  const {
    credentialListOptions: CredentialListOptions,
    credentialEmptyList: CredentialEmptyList,
    enableTours: enableToursConfig,
    credentialHideList,
  } = useConfiguration()

  let credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
  ]

  // Filter out hidden credentials when not in dev mode
  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter((r) => {
      const credDefId = r.metadata.get(AnonCredsCredentialMetadataKey)?.credentialDefinitionId
      return !credentialHideList?.includes(credDefId)
    })
  }

  const { ColorPallet } = useTheme()
  const { start, stop } = useTour()
  const screenIsFocused = useIsFocused()

  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour

    if (shouldShowTour && screenIsFocused) {
      start(TourID.CredentialsTour)
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true],
      })
    }

    return stop
  }, [screenIsFocused])

  return (
    <View>
      <FlatList
        style={{ backgroundColor: ColorPallet.brand.primaryBackground }}
        data={credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())}
        keyExtractor={(credential) => credential.id}
        renderItem={({ item: credential, index }) => {
          return (
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 15,
                marginBottom: index === credentials.length - 1 ? 45 : 0,
              }}
            >
              <ListCredential credential={credential} />
            </View>
          )
        }}
        ListEmptyComponent={() => <CredentialEmptyList message={t('Credentials.EmptyList')} />}
      />
      <CredentialListOptions />
    </View>
  )
}

export default ListCredentials
