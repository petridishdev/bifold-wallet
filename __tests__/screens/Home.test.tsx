import React from 'react';
import TestRenderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import Home from '../../App/screens/Home';
import ModularView from '../../App/components/views/ModularView';
import { FlatList, Text } from 'react-native';

jest.mock("@aries-framework/react-hooks", () => ({
    useCredentialByState: () => [],
    useProofByState: () => []
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key)
    })
}));

describe('displays a home screen', () => {
    afterEach(() => {
        cleanup();
    });

    describe('with a notifications module', () => {
        it('is not null', () => {
            const navigate = jest.fn();
            const testRenderer = TestRenderer.create(<Home navigation={{navigate} as any} />);
            const rootInstance = testRenderer.root;
            const modularViewInstance = rootInstance.findByType(ModularView);

            expect(modularViewInstance).not.toBeNull();
        });

        it('has a title', () => {
            const navigate = jest.fn();
            const testRenderer = TestRenderer.create(<Home navigation={{navigate} as any} />);
            const rootInstance = testRenderer.root;
            const modularViewInstance = rootInstance.findByType(ModularView);

            expect(modularViewInstance.props.title).toBe('Home.Notifications');  
        });
        
        it('has no items by default', () => {
            const navigate = jest.fn();
            const testRenderer = TestRenderer.create(<Home navigation={{navigate} as any} />);
            const rootInstance = testRenderer.root;
            const modularViewInstance = rootInstance.findByType(ModularView);
            const flatListInstance = modularViewInstance.findByType(FlatList);

            expect(flatListInstance.findByType(Text).props.children).toBe('Home.NoNewUpdates');
        });
    });
        
    describe('with a button to manage your wallet', () => {
        test('it has text', async () => {
            const navigate = jest.fn();
            const { findByText } = render(<Home navigation={{navigate} as any} />);
            const touchableOpacityInstance = await findByText('Home.ManageYourWallet');

            expect(touchableOpacityInstance).not.toBeNull();
        }); 

        test('pressing it takes you to the manage wallet screen', async () => {
            const navigate = jest.fn();
            const { findByText } = render(<Home navigation={{navigate} as any} />);
            const touchableOpacityInstance = await findByText('Home.ManageYourWallet');

            fireEvent(touchableOpacityInstance, 'press');

            expect(navigate).toHaveBeenCalledWith('Manage Your Wallet');
        });
    });
});