import { Meta, StoryObj } from '@storybook/react'

import { LocalizedAttribute } from '@oca/formatters'
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
            formattedLabel: 'Name',
            formattedValue: 'John Doe',
          } as LocalizedAttribute
        }
      />
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Claim>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
