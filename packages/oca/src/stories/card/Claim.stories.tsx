import { LocalizedAttribute } from '@oca/formatters'
import { Meta, StoryObj } from '@storybook/react'
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
          } as LocalizedAttribute
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
