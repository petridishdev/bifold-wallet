import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import CredentialOffer from '../screens/CredentialOffer'
import Home from '../screens/Home'
import ManageWallet from '../screens/ManageWallet'
import ProofRequest from '../screens/ProofRequest'

import defaultStackOptions from './defaultStackOptions'

import { HomeStackParams } from 'types/navigators'

const Stack = createStackNavigator<HomeStackParams>()

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions, headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Credential Offer" component={CredentialOffer} />
      <Stack.Screen name="Proof Request" component={ProofRequest} />
      <Stack.Screen name="Manage Your Wallet" component={ManageWallet} />
    </Stack.Navigator>
  )
}

export default HomeStack
