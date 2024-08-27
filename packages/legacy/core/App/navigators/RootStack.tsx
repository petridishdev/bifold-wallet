import { ProofState } from '@credo-ts/core'
import { useAgent, useProofByState } from '@credo-ts/react-hooks'
import { ProofCustomMetadata, ProofMetadata } from '@hyperledger/aries-bifold-verifier'
import { useNavigation } from '@react-navigation/core'
import { StackCardStyleInterpolator, StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppState, DeviceEventEmitter } from 'react-native'

import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton'
import { EventTypes, walletTimeout } from '../constants'
import { TOKENS, useContainer } from '../container-api'
import { useAuth } from '../contexts/auth'
import { useConfiguration } from '../contexts/configuration'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { useDeepLinks } from '../hooks/deep-links'
import Chat from '../screens/Chat'
import { BifoldError } from '../types/error'
import { AuthenticateStackParams, Screens, Stacks, TabStacks } from '../types/navigators'
import { connectFromScanOrDeepLink } from '../utils/helpers'
import { testIdWithKey } from '../utils/testable'

import ConnectStack from './ConnectStack'
import ContactStack from './ContactStack'
import DeliveryStack from './DeliveryStack'
import NotificationStack from './NotificationStack'
import ProofRequestStack from './ProofRequestStack'
import SettingStack from './SettingStack'
import TabStack from './TabStack'
import { createDefaultStackOptions } from './defaultStackOptions'

const RootStack: React.FC = () => {
  const [state, dispatch] = useStore()
  const { removeSavedWalletSecret } = useAuth()
  const { agent } = useAgent()
  const appState = useRef(AppState.currentState)
  const [backgroundTime, setBackgroundTime] = useState<number | undefined>(undefined)
  const [prevAppStateVisible, setPrevAppStateVisible] = useState<string>('')
  const [appStateVisible, setAppStateVisible] = useState<string>('')
  const [inBackground, setInBackground] = useState<boolean>(false)
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)
  const { splash, enableImplicitInvitations, enableReuseConnections } = useConfiguration()
  const container = useContainer()
  const logger = container.resolve(TOKENS.UTIL_LOGGER)
  const OnboardingStack = container.resolve(TOKENS.STACK_ONBOARDING)
  const loadState = container.resolve(TOKENS.LOAD_STATE)
  useDeepLinks()

  // remove connection on mobile verifier proofs if proof is rejected regardless of if it has been opened
  const declinedProofs = useProofByState([ProofState.Declined, ProofState.Abandoned])
  useEffect(() => {
    declinedProofs.forEach((proof) => {
      const meta = proof?.metadata?.get(ProofMetadata.customMetadata) as ProofCustomMetadata
      if (meta?.delete_conn_after_seen) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        agent?.connections.deleteById(proof?.connectionId ?? '').catch(() => {})
        proof?.metadata.set(ProofMetadata.customMetadata, { ...meta, delete_conn_after_seen: false })
      }
    })
  }, [declinedProofs, state.preferences.useDataRetention])

  const lockoutUser = async () => {
    if (agent && state.authentication.didAuthenticate) {
      // make sure agent is shutdown so wallet isn't still open
      removeSavedWalletSecret()
      try {
        await agent.wallet.close()
        await agent.shutdown()
      } catch (error) {
        logger?.error(`Error shutting down agent: ${error}`)
      }
      dispatch({
        type: DispatchAction.DID_AUTHENTICATE,
        payload: [{ didAuthenticate: false }],
      })
      dispatch({
        type: DispatchAction.LOCKOUT_UPDATED,
        payload: [{ displayNotification: true }],
      })
    }
  }

  useEffect(() => {
    loadState(dispatch)
      .then(() => {
        dispatch({ type: DispatchAction.STATE_LOADED })
      })
      .catch((err) => {
        const error = new BifoldError(t('Error.Title1044'), t('Error.Message1044'), err.message, 1001)
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
      })
  }, [])

  // handle deeplink events
  useEffect(() => {
    async function handleDeepLink(deepLink: string) {
      // If it's just the general link with no params, set link inactive and do nothing
      if (deepLink.search(/oob=|c_i=|d_m=|url=/) < 0) {
        dispatch({
          type: DispatchAction.ACTIVE_DEEP_LINK,
          payload: [undefined],
        })
        return
      }

      try {
        await connectFromScanOrDeepLink(
          deepLink,
          agent,
          logger,
          navigation,
          true, // isDeepLink
          enableImplicitInvitations,
          enableReuseConnections
        )
      } catch (err: unknown) {
        const error = new BifoldError(
          t('Error.Title1039'),
          t('Error.Message1039'),
          (err as Error)?.message ?? err,
          1039
        )
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
      }

      // set deeplink as inactive
      dispatch({
        type: DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined],
      })
    }

    if (inBackground) {
      return
    }

    if (agent && agent.isInitialized && state.deepLink.activeDeepLink && state.authentication.didAuthenticate) {
      handleDeepLink(state.deepLink.activeDeepLink)
    }
  }, [agent, state.deepLink.activeDeepLink, state.authentication.didAuthenticate, inBackground])

  useEffect(() => {
    AppState.addEventListener('change', (nextAppState) => {
      if (appState.current === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        //update time that app gets put in background
        setInBackground(true)
        setBackgroundTime(Date.now())
      }

      setPrevAppStateVisible(appState.current)
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })
  }, [])

  useEffect(() => {
    const lockoutCheck = async () => {
      //lock user out after 5 minutes
      if (
        !state.preferences.preventAutoLock &&
        walletTimeout &&
        backgroundTime &&
        Date.now() - backgroundTime > walletTimeout
      ) {
        await lockoutUser()
        return true
      }

      return false
    }

    if (appStateVisible === 'active' && ['inactive', 'background'].includes(prevAppStateVisible) && backgroundTime) {
      // prevents the user from being locked out during metro reloading
      setPrevAppStateVisible(appStateVisible)

      lockoutCheck().then((lockoutInProgress) => {
        if (lockoutInProgress) {
          const unsubscribe = navigation.addListener('state', (): void => {
            setInBackground(false)
            unsubscribe()
          })
        } else {
          setInBackground(false)
        }
      })
    }
  }, [appStateVisible, prevAppStateVisible, backgroundTime])

  // auth stack should now be in the OnboardingStack

  const mainStack = () => {
    const Stack = createStackNavigator()

    // This function is to make the fade in behavior of both iOS and Android consistent for the settings menu
    const forFade: StackCardStyleInterpolator = ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
      },
    })

    return (
      <Stack.Navigator initialRouteName={Screens.Splash} screenOptions={{ ...defaultStackOptions, headerShown: false }}>
        <Stack.Screen name={Screens.Splash} component={splash} />
        <Stack.Screen name={Stacks.TabStack} component={TabStack} />
        <Stack.Screen
          name={Screens.Chat}
          component={Chat}
          options={({ navigation }) => ({
            headerShown: true,
            title: t('Screens.CredentialOffer'),
            headerLeft: () => (
              <HeaderButton
                buttonLocation={ButtonLocation.Left}
                accessibilityLabel={t('Global.Back')}
                testID={testIdWithKey('BackButton')}
                onPress={() => {
                  navigation.navigate(TabStacks.HomeStack, { screen: Screens.Home })
                }}
                icon="arrow-left"
              />
            ),
          })}
        />
        <Stack.Screen name={Stacks.ConnectStack} component={ConnectStack} />
        <Stack.Screen
          name={Stacks.SettingStack}
          component={SettingStack}
          options={{
            cardStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen name={Stacks.ContactStack} component={ContactStack} />
        <Stack.Screen name={Stacks.NotificationStack} component={NotificationStack} />
        <Stack.Screen name={Stacks.ConnectionStack} component={DeliveryStack} options={{ gestureEnabled: false }} />
        <Stack.Screen name={Stacks.ProofRequestsStack} component={ProofRequestStack} />
      </Stack.Navigator>
    )
  }

  if (
    ((state.onboarding.onboardingVersion !== 0 && state.onboarding.didCompleteOnboarding) ||
      (state.onboarding.onboardingVersion === 0 && state.onboarding.didConsiderBiometry)) &&
    state.authentication.didAuthenticate &&
    state.onboarding.postAuthScreens.length === 0
  ) {
    return mainStack()
  }
  return <OnboardingStack />
}

export default RootStack
