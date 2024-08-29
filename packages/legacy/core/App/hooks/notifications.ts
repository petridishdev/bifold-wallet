import {
  BasicMessageRecord,
  CredentialExchangeRecord as CredentialRecord,
  CredentialState,
  ProofExchangeRecord,
  ProofState,
} from '@credo-ts/core'
import { useBasicMessages, useCredentialByState, useProofByState } from '@credo-ts/react-hooks'
import { ProofCustomMetadata, ProofMetadata } from '@hyperledger/aries-bifold-verifier'
import { useEffect, useState } from 'react'

import {
  BasicMessageMetadata,
  CredentialMetadata,
  basicMessageCustomMetadata,
  credentialCustomMetadata,
} from '../types/metadata'

export const useNotifications = (): Array<BasicMessageRecord | CredentialRecord | ProofExchangeRecord> => {
  const { records: basicMessages } = useBasicMessages()
  const [notifications, setNotifications] = useState<(BasicMessageRecord | CredentialRecord | ProofExchangeRecord)[]>(
    []
  )

  const credsReceived = useCredentialByState(CredentialState.CredentialReceived)
  const credsDone = useCredentialByState(CredentialState.Done)
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived])
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const proofsRequested = useProofByState(ProofState.RequestReceived)

  useEffect(() => {
    // get all unseen messages
    const unseenMessages: BasicMessageRecord[] = basicMessages.filter((msg) => {
      const meta = msg.metadata.get(BasicMessageMetadata.customMetadata) as basicMessageCustomMetadata
      return !meta?.seen
    })

    // add one unseen message per contact to notifications
    const contactsWithUnseenMessages: string[] = []
    const messagesToShow: BasicMessageRecord[] = []
    unseenMessages.forEach((msg) => {
      if (!contactsWithUnseenMessages.includes(msg.connectionId)) {
        contactsWithUnseenMessages.push(msg.connectionId)
        messagesToShow.push(msg)
      }
    })

    const validProofsDone = proofsDone.filter((proof: ProofExchangeRecord) => {
      if (proof.isVerified === undefined) return false
      const metadata = proof.metadata.get(ProofMetadata.customMetadata) as ProofCustomMetadata
      return !metadata?.details_seen
    })
    const revoked = credsDone.filter((cred: CredentialRecord) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = cred!.metadata.get(CredentialMetadata.customMetadata) as credentialCustomMetadata
      if (cred?.revocationNotification && metadata?.revoked_seen == undefined) {
        return cred
      }
    })

    const notif = [...messagesToShow, ...offers, ...proofsRequested, ...validProofsDone, ...revoked].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setNotifications(notif)
  }, [basicMessages, credsReceived, proofsDone, proofsRequested, offers, credsDone])

  return notifications
}
