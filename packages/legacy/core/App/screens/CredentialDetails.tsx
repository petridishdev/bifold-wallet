import type { StackScreenProps } from '@react-navigation/stack'

import { CredentialExchangeRecord } from '@credo-ts/core'
import { useAgent } from '@credo-ts/react-hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import InfoBox, { InfoBoxType } from '../components/misc/InfoBox'
import CommonRemoveModal from '../components/modals/CommonRemoveModal'
import { ToastType } from '../components/toast/BaseToast'
import { EventTypes } from '../constants'
import { TOKENS, useServices } from '../container-api'
import { useTheme } from '../contexts/theme'
import { BifoldError } from '../types/error'
import { CredentialMetadata, credentialCustomMetadata } from '../types/metadata'
import { CredentialStackParams, Screens } from '../types/navigators'
import { ModalUsage } from '../types/remove'
import { getCredentialIdentifiers, isValidAnonCredsCredential } from '../utils/credential'
import { formatTime, useCredentialConnectionLabel } from '../utils/helpers'

import { OverlayBundle } from '@hyperledger/aries-oca'
import { LocalizedCredential } from '@hyperledger/aries-oca/build/formatters'
import { CredentialDetail } from '@hyperledger/aries-oca/build/ui/components'
import { LocalizedCredentialContext } from '@hyperledger/aries-oca/build/ui/contexts'

import { i18n as localization } from '../localization'

type CredentialDetailsProps = StackScreenProps<CredentialStackParams, Screens.CredentialDetails>

const CredentialDetails: React.FC<CredentialDetailsProps> = ({ navigation, route }) => {
  if (!route?.params) {
    throw new Error('CredentialDetails route prams were not set properly')
  }

  const { credential } = route?.params
  const { agent } = useAgent()
  const { t, i18n } = useTranslation()
  const { TextTheme, ColorPallet } = useTheme()
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER])
  const [isRevoked, setIsRevoked] = useState<boolean>(false)
  const [revocationDate, setRevocationDate] = useState<string>('')
  const [preciseRevocationDate, setPreciseRevocationDate] = useState<string>('')
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState<boolean>(false)
  const [isRevokedMessageHidden, setIsRevokedMessageHidden] = useState<boolean>(
    (credential!.metadata.get(CredentialMetadata.customMetadata) as credentialCustomMetadata)
      ?.revoked_detail_dismissed ?? false
  )

  const [bundle, setBundle] = useState<OverlayBundle>()
  const credentialConnectionLabel = useCredentialConnectionLabel(credential)

  useEffect(() => {
    if (!agent || !credential) {
      DeviceEventEmitter.emit(
        EventTypes.ERROR_ADDED,
        new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033)
      )
    }
  }, [])

  useEffect(() => {
    if (!(credential && isValidAnonCredsCredential(credential))) {
      return
    }

    credential.revocationNotification == undefined ? setIsRevoked(false) : setIsRevoked(true)
    if (credential?.revocationNotification?.revocationDate) {
      const date = new Date(credential.revocationNotification.revocationDate)
      setRevocationDate(formatTime(date, { shortMonth: true }))
      setPreciseRevocationDate(formatTime(date, { includeHour: true }))
    }

    bundleResolver
      .resolveDefaultBundle({
        identifiers: getCredentialIdentifiers(credential),
        metadata: {
          connectionId: credential?.connectionId,
          connectionAlias: credentialConnectionLabel,
        },
        // attributes: buildFieldsFromAnonCredsCredential(credential),
        language: i18n.language,
      })
      .then(setBundle)
  }, [credential, i18n.language])

  useEffect(() => {
    if (credential?.revocationNotification) {
      const meta = credential!.metadata.get(CredentialMetadata.customMetadata)
      credential.metadata.set(CredentialMetadata.customMetadata, { ...meta, revoked_seen: true })
      agent?.credentials.update(credential)
    }
  }, [isRevoked])

  const handleOnRemove = () => {
    setIsRemoveModalDisplayed(true)
  }

  const handleSubmitRemove = async () => {
    try {
      if (!(agent && credential)) {
        return
      }

      await agent.credentials.deleteById(credential.id)

      navigation.pop()

      // FIXME: This delay is a hack so that the toast doesn't appear until the modal is dismissed
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Toast.show({
        type: ToastType.Success,
        text1: t('CredentialDetails.CredentialRemoved'),
      })
    } catch (err: unknown) {
      const error = new BifoldError(t('Error.Title1032'), t('Error.Message1032'), (err as Error)?.message ?? err, 1032)
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
    }
  }

  const handleCancelRemove = () => {
    setIsRemoveModalDisplayed(false)
  }

  const handleDismissRevokedMessage = () => {
    setIsRevokedMessageHidden(true)
    const meta = credential!.metadata.get(CredentialMetadata.customMetadata)
    credential.metadata.set(CredentialMetadata.customMetadata, { ...meta, revoked_detail_dismissed: true })
    agent?.credentials.update(credential)
  }

  // const callOnRemove = useCallback(() => handleOnRemove(), [])
  const callSubmitRemove = useCallback(() => handleSubmitRemove(), [])
  const callCancelRemove = useCallback(() => handleCancelRemove(), [])
  const callDismissRevokedMessage = useCallback(() => handleDismissRevokedMessage(), [])

  const CredentialRevocationMessage: React.FC<{ credential: CredentialExchangeRecord }> = ({ credential }) => {
    return (
      <InfoBox
        notificationType={InfoBoxType.Error}
        title={t('CredentialDetails.CredentialRevokedMessageTitle') + ' ' + revocationDate}
        description={
          credential?.revocationNotification?.comment
            ? credential.revocationNotification.comment
            : t('CredentialDetails.CredentialRevokedMessageBody')
        }
        onCallToActionLabel={t('Global.Dismiss')}
        onCallToActionPressed={callDismissRevokedMessage}
      />
    )
  }

  return (
    <SafeAreaView edges={['left', 'right']}>
      <ScrollView>
        {bundle ? (
          <LocalizedCredentialContext.Provider value={new LocalizedCredential(bundle, credential, i18n.language)}>
            <CredentialDetail i18n={localization} />
          </LocalizedCredentialContext.Provider>
        ) : null}
        <CommonRemoveModal
          usage={ModalUsage.CredentialRemove}
          visible={isRemoveModalDisplayed}
          onSubmit={callSubmitRemove}
          onCancel={callCancelRemove}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CredentialDetails
