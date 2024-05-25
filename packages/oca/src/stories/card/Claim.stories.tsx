import { Meta, StoryObj } from '@storybook/react'

import { DisplayAttribute } from '@oca/formatters'
import Claim from '@ui/components/card/claim/Claim'

const meta = {
  title: 'Card/Claim',
  component: () => {
    return (
      <Claim
        attribute={
          {
            label: 'Name',
            value: 'John Doe',
          } as DisplayAttribute
        }
      />
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj

export const Default = {} satisfies Story
