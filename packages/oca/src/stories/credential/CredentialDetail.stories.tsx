import { Meta, StoryObj } from '@storybook/react'

import { LocalizedCredential } from '@oca/formatters'
import { LocalizedCredentialContext } from '@ui/contexts/localizedCredential'
import CredentialDetail from '@oca/ui/components/credential/CredentialDetail'

import data from '@tests/fixtures/bundles/student-card-bundle.json'
import { OverlayBundle } from '@oca/types'
import { CredentialExchangeRecord, CredentialPreviewAttribute, CredentialRole, CredentialState } from '@credo-ts/core'

const meta = {
  title: 'Credential/Detail',
  component: () => {
    const bundle = new OverlayBundle('', data[0])

    const attributes = [
      {
        name: 'expiry_date',
        value: '20230101',
      },
      {
        name: 'student_last_name',
        value: 'Doe',
      },
      {
        name: 'student_first_name',
        value: 'John',
      },
      {
        name: 'attribute_1_no_overlay',
        value: '12345',
      },
      {
        name: 'attribute_2_no_overlay',
        value: '2023-01-01T00:00:00Z',
      },
    ]

    const record = new CredentialExchangeRecord({
      protocolVersion: '2.0',
      role: CredentialRole.Holder,
      state: CredentialState.Done,
      threadId: '',
      credentialAttributes: attributes.map((attribute) => new CredentialPreviewAttribute(attribute)),
    })

    const credential = new LocalizedCredential(bundle, record, 'en')

    return (
      <LocalizedCredentialContext.Provider value={credential}>
        <CredentialDetail />
      </LocalizedCredentialContext.Provider>
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Credential>

export default meta

type Story = StoryObj<typeof Credential>

export const Basic = {} satisfies Story
