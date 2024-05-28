import { Meta, StoryObj } from '@storybook/react'
import { useWindowDimensions } from 'react-native'

import Secondary from '@ui/components/card/body/Secondary'

const meta: Meta = {
  title: 'Card/Layout/Secondary Body',
  component: () => {
    const { width } = useWindowDimensions()
    return <Secondary style={{ width: 0.12 * width, height: 0.33 * width, backgroundColor: 'rgba(0, 0, 0, 0.24)' }} />
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Secondary>

export default meta

type Story = StoryObj<typeof Secondary>

export const Default = {} satisfies Story
