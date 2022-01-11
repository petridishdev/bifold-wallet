import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

// eslint-disable-next-line import/no-cycle
import Scan from '../screens/Scan'

import defaultStackOptions from './defaultStackOptions'

import { ScanStackParams } from 'types/navigators'

const Stack = createStackNavigator<ScanStackParams>()

function ScanStack() {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions, headerShown: false }}>
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  )
}

export default ScanStack
