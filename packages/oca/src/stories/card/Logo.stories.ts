import type { Meta, StoryObj } from '@storybook/react'

import Logo from '@ui/components/card/Logo'

const meta = {
  title: 'Card/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['style'],
    },
  },
  argTypes: {
    source: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    elevation: {
      control: 'number',
    },
  },
  args: {
    style: {
      width: 150,
      height: 150,
    },
  },
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const Source = {
  args: {
    source:
      'https://raw.githubusercontent.com/bcgov/aries-oca-bundles/main/OCABundles/schema/bcgov-digital-trust/LCRB/selling-it-right/bc-logo.jpg',
  },
} satisfies Story
