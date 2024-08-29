import {
  BasicMessageRecord,
  BasicMessageRole,
  ConnectionRecord,
  DidExchangeRole,
  DidExchangeState,
} from '@credo-ts/core'
import { useBasicMessagesByConnectionId, useConnectionById } from '@credo-ts/react-hooks'
import { render } from '@testing-library/react-native'
import React from 'react'

import * as network from '../../App/contexts/network'
import Chat from '../../App/screens/Chat'
import { BasicMessageMetadata } from '../../App/types/metadata'
import navigationContext from '../contexts/navigation'
import { BasicAppContext } from '../helpers/app'

const props = { params: { connectionId: '1' } }

const connection = new ConnectionRecord({
  id: '1',
  createdAt: new Date(2024, 1, 1),
  state: DidExchangeState.Completed,
  role: DidExchangeRole.Requester,
  theirDid: 'did:example:123',
  theirLabel: 'Alice',
})

const unseenMessage = new BasicMessageRecord({
  threadId: '1',
  connectionId: '1',
  role: BasicMessageRole.Receiver,
  content: 'Hello',
  sentTime: '20200303',
})

unseenMessage.metadata = {
  get: jest.fn().mockReturnValue(undefined),
  set: jest.fn(),
  add: jest.fn(),
  delete: jest.fn(),
  keys: [BasicMessageMetadata.customMetadata],
  data: {
    [BasicMessageMetadata.customMetadata]: {
      seen: false,
    },
  },
}

const seenMessage = new BasicMessageRecord({
  threadId: '2',
  connectionId: '1',
  role: BasicMessageRole.Receiver,
  content: 'Hi',
  sentTime: '20200303',
})

seenMessage.metadata = {
  get: jest.fn().mockReturnValue({ seen: true }),
  set: jest.fn(),
  add: jest.fn(),
  delete: jest.fn(),
  keys: [BasicMessageMetadata.customMetadata],
  data: {
    [BasicMessageMetadata.customMetadata]: {
      seen: true,
    },
  },
}

const testBasicMessages: BasicMessageRecord[] = [unseenMessage, seenMessage]

describe('Chat screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // @ts-ignore
    useConnectionById.mockReturnValue(connection)
    // @ts-ignore
    useBasicMessagesByConnectionId.mockReturnValue(testBasicMessages)
  })

  test('Renders correctly', async () => {
    jest.spyOn(network, 'useNetwork').mockImplementation(() => ({
      silentAssertConnectedNetwork: () => true,
      assertConnectedNetwork: () => true,
      assertLedgerConnectivity: jest.fn(),
      displayNetInfoModal: jest.fn(),
      hideNetInfoModal: jest.fn(),
    }))
    const element = (
      <BasicAppContext>
        <Chat navigation={navigationContext} route={props as any} />
      </BasicAppContext>
    )
    const tree = render(element)

    expect(tree).toMatchSnapshot()
  })
})

describe('Chat screen with messages', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // @ts-ignore
    useConnectionById.mockReturnValue(connection)
    // @ts-ignore
    useBasicMessagesByConnectionId.mockReturnValue(testBasicMessages)
    jest.spyOn(network, 'useNetwork').mockImplementation(() => ({
      silentAssertConnectedNetwork: () => true,
      assertConnectedNetwork: () => true,
      assertLedgerConnectivity: jest.fn(),
      displayNetInfoModal: jest.fn(),
      hideNetInfoModal: jest.fn(),
    }))
  })

  test('Marks messages as seen', async () => {
    render(
      <BasicAppContext>
        <Chat navigation={navigationContext} route={props as any} />
      </BasicAppContext>
    )

    expect(unseenMessage.metadata.set).toBeCalled()
    expect(seenMessage.metadata.set).not.toBeCalled()
  })
})
