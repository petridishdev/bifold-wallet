import { Meta, StoryObj } from '@storybook/react';

import Claim from '../../../components/credential/claim/Claim';
import { DisplayAttribute } from '../../../formatters';

const meta = {
    title: 'Credential/Components/Claim',
    component: () => {
        return <Claim attribute={{
            label: 'Name',
            value: 'John Doe',
        } as DisplayAttribute} />;
    },
    parameters: {
        layout: 'padded',
    },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default = {} satisfies Story;