/* eslint-disable import/no-cycle */
import type { OnboardingStyleSheet } from './screens/Onboarding'

import { Agent } from '@credo-ts/core'
import AgentProvider from '@credo-ts/react-hooks'

import App from './App'
import * as components from './components'
import { ButtonImpl as Button, ButtonType, Button as IButton } from './components/buttons/Button'
import HeaderButton, { ButtonLocation } from './components/buttons/HeaderButton'
import BulletPoint from './components/inputs/BulletPoint'
import CheckBoxRow from './components/inputs/CheckBoxRow'
import ContentGradient from './components/misc/ContentGradient'
import CredentialCard from './components/misc/CredentialCard'
import InfoBox, { InfoBoxType } from './components/misc/InfoBox'
import ErrorModal from './components/modals/ErrorModal'
import NetInfo from './components/network/NetInfo'
import Record from './components/record/Record'
import InfoTextBox from './components/texts/InfoTextBox'
import Link from './components/texts/Link'
import Text from './components/texts/Text'
import { ToastType } from './components/toast/BaseToast'
import toastConfig from './components/toast/ToastConfig'
import { AttachTourStep } from './components/tour/AttachTourStep'
import { credentialOfferTourSteps } from './components/tour/CredentialOfferTourSteps'
import { credentialsTourSteps } from './components/tour/CredentialsTourSteps'
import { homeTourSteps } from './components/tour/HomeTourSteps'
import { proofRequestTourSteps } from './components/tour/ProofRequestTourSteps'
import { TourBox } from './components/tour/TourBox'
import HomeFooterView from './components/views/HomeFooterView'
import { PINRules } from './constants'
import * as contexts from './contexts'
import { AuthProvider } from './contexts/auth'
import { NetworkProvider } from './contexts/network'
import { useTour } from './contexts/tour/tour-context'
import { TourProvider } from './contexts/tour/tour-provider'
import RootStack from './navigators/RootStack'
import AttemptLockout from './screens/AttemptLockout'
import Developer from './screens/Developer'
import Onboarding from './screens/Onboarding'
import OnboardingPages from './screens/OnboardingPages'
import Preface from './screens/Preface'
import Scan from './screens/Scan'
import Splash from './screens/Splash'
import Terms from './screens/Terms'
import UseBiometry from './screens/UseBiometry'
import { loadLoginAttempt } from './services/keychain'
import * as types from './types'

export { animatedComponents } from './animated-components'
export { EventTypes, LocalStorageKeys } from './constants'
export { AnimatedComponentsProvider, useAnimatedComponents } from './contexts/animated-components'
export { useAuth } from './contexts/auth'
export { DispatchAction, reducer, default as Store } from './contexts/reducers/store'
export { defaultState, mergeReducers, StoreContext, StoreProvider, useStore } from './contexts/store'
export { ThemeProvider, useTheme } from './contexts/theme'
export { initLanguages, initStoredLanguage, Locales, translationResources } from './localization'
export { createStyles } from './screens/OnboardingPages'
export { ColorPallet, Assets as ImageAssets, NavigationTheme, theme } from './theme'
export * from './types/attestation'
export { BifoldError } from './types/error'
export { Screens, Stacks, TabStacks } from './types/navigators'
export { createLinkSecretIfRequired, getAgentModules } from './utils/agent'
export { removeExistingInvitationIfRequired } from './utils/helpers'
export { statusBarStyleForColor, StatusBarStyles } from './utils/luminance'
export { didMigrateToAskar, migrateToAskar } from './utils/migration'
export { testIdForAccessabilityLabel, testIdWithKey } from './utils/testable'

export type { AnimatedComponents } from './animated-components'
export * from './container-api'
export { MainContainer } from './container-impl'
export type { ReducerAction } from './contexts/reducers/store'
export type { RenderProps, TourStep } from './contexts/tour/tour-context'
export type {
  IAssets,
  IBrandColors,
  IColorPallet,
  IFontAttributes,
  IGrayscaleColors,
  IInputAttributes,
  IInputs,
  INotificationColors,
  ISemanticColors,
  ISVGAssets,
  ITextTheme,
  ITheme,
} from './theme'
export type { GenericFn } from './types/fn'
export type { AuthenticateStackParams, NotificationStackParams, OnboardingStackParams } from './types/navigators'
export type { WalletSecret } from './types/security'
export type {
  LoginAttempt as LoginAttemptState,
  Migration as MigrationState,
  Onboarding as OnboardingState,
  Preferences as PreferencesState,
  State,
  Tours as ToursState,
} from './types/state'
export type { BifoldAgent } from './utils/agent'
export type { OnboardingStyleSheet }

export {
  Agent,
  AgentProvider,
  App,
  AttachTourStep,
  AttemptLockout,
  AuthProvider,
  BulletPoint,
  Button,
  ButtonLocation,
  ButtonType,
  CheckBoxRow,
  components,
  ContentGradient,
  contexts,
  CredentialCard,
  credentialOfferTourSteps,
  credentialsTourSteps,
  Developer,
  ErrorModal,
  HeaderButton,
  HomeFooterView as HomeContentView,
  homeTourSteps,
  InfoBox,
  InfoBoxType,
  InfoTextBox,
  Link,
  loadLoginAttempt,
  NetInfo,
  NetworkProvider,
  Onboarding,
  OnboardingPages,
  PINRules,
  Preface,
  proofRequestTourSteps,
  Record,
  RootStack,
  Scan,
  Splash,
  Terms,
  Text,
  toastConfig,
  ToastType,
  TourBox,
  TourProvider,
  types,
  UseBiometry,
  useTour,
}
export type { IButton }
