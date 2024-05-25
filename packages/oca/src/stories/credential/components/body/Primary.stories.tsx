import { Meta, StoryObj } from '@storybook/react'
import { Text, useWindowDimensions } from 'react-native'

import { LocalizedCredentialContext } from '../../../../ui/contexts/localizedCredential'
import Primary from '../../../../ui/components/card/body/Primary'
import { LocalizedCredential } from '../../../../formatters'

const meta = {
  title: 'Credential/Components/Layout/Primary Body',
  component: () => {
    const { width } = useWindowDimensions()
    return (
      <LocalizedCredentialContext.Provider
        value={
          {
            primaryBackgroundColor: 'rgba(0, 0, 0, 0.24)',
          } as LocalizedCredential
        }
      >
        <Primary style={{ width: 0.88 * width, height: 0.33 * width }}>
          <Text style={{ flex: 1, alignContent: 'center', textAlign: 'center' }}>Primary Body</Text>
        </Primary>
      </LocalizedCredentialContext.Provider>
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Primary>

export default meta

type Story = StoryObj<typeof Primary>

export const Default = {} satisfies Story
