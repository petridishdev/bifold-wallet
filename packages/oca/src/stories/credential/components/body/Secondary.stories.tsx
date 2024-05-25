import { Meta, StoryObj } from '@storybook/react'
import { useWindowDimensions } from 'react-native'

import { LocalizedCredentialContext } from '../../../../components/contexts/localizedCredential'
import Secondary from '../../../../components/credential/body/Secondary'
import { LocalizedCredential } from '../../../../formatters'

const meta: Meta = {
  title: 'Credential/Components/Layout/Secondary Body',
  component: () => {
    const { width } = useWindowDimensions()
    return (
      <LocalizedCredentialContext.Provider
        value={
          {
            secondaryBackgroundColor: 'rgba(0, 0, 0, 0.24)',
          } as LocalizedCredential
        }
      >
        <Secondary style={{ width: 0.12 * width, height: 0.33 * width }} />
      </LocalizedCredentialContext.Provider>
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Secondary>

export default meta

type Story = StoryObj<typeof Secondary>

export const Default = {} satisfies Story
