import type { Meta, StoryObj } from '@storybook/react'

import Status, { StatusLevelEnum } from '../../../ui/components/card/Status'

const meta = {
  title: 'Credential/Components/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['style'],
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [StatusLevelEnum.WARNING, StatusLevelEnum.ERROR],
    },
  },
  args: {
    style: {
      width: 150,
      height: 150,
    },
  },
} satisfies Meta<typeof Status>

export default meta

type Story = StoryObj<typeof meta>

export const Warning = {
  args: {
    level: StatusLevelEnum.WARNING,
  },
} satisfies Story

export const Error = {
  args: {
    level: StatusLevelEnum.ERROR,
  },
} satisfies Story
