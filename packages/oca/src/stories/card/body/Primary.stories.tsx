import { Meta, StoryObj } from '@storybook/react'
import Primary from '@ui/components/card/body/Primary'
import { Text, useWindowDimensions } from 'react-native'

const meta = {
  title: 'Card/Layout/Primary Body',
  component: () => {
    const { width } = useWindowDimensions()
    return (
      <Primary style={{ width: 0.88 * width, height: 0.33 * width, backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
        <Text style={{ flex: 1, alignContent: 'center', textAlign: 'center' }}>Primary Body</Text>
      </Primary>
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Primary>

export default meta

type Story = StoryObj<typeof Primary>

export const Default = {} satisfies Story
