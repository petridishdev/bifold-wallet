import { Meta, StoryObj } from '@storybook/react'
import { useWindowDimensions } from 'react-native'

import { LocalizedCredential } from '@oca/formatters'
import { LocalizedCredentialContext } from '@ui/contexts/localizedCredential'
import Secondary from '@ui/components/card/body/Secondary'

const meta: Meta = {
  title: 'Card/Layout/Secondary Body',
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
