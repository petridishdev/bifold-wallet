import { Agent, BaseLogger } from '@credo-ts/core'
import { getProofRequestTemplates } from '@hyperledger/aries-bifold-verifier'
import { DefaultOCABundleResolver } from '@hyperledger/aries-oca/build/legacy'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import { createContext, useContext } from 'react'
import { DependencyContainer } from 'tsyringe'

import { OverlayBundleResolver } from '@hyperledger/aries-oca'
import * as bundle from './assets/oca-bundles.json'
import Button from './components/buttons/Button'
import EmptyList from './components/misc/EmptyList'
import Record from './components/record/Record'
import HomeFooterView from './components/views/HomeFooterView'
import HomeHeaderView from './components/views/HomeHeaderView'
import defaultIndyLedgers from './configs/ledgers/indy'
import { LocalStorageKeys, PINRules } from './constants'
import { Container, TokenMapping, TOKENS } from './container-api'
import { DispatchAction, ReducerAction } from './contexts/reducers/store'
import { defaultState } from './contexts/store'
import { useNotifications } from './hooks/notifications'
import { IHistoryManager } from './modules/history'
import HistoryManager from './modules/history/context/historyManager'
import OnboardingStack from './navigators/OnboardingStack'
import { DefaultScreenOptionsDictionary } from './navigators/defaultStackOptions'
import Developer from './screens/Developer'
import Onboarding from './screens/Onboarding'
import OnboardingPages from './screens/OnboardingPages'
import Preface from './screens/Preface'
import Scan from './screens/Scan'
import Splash from './screens/Splash'
import ScreenTerms, { TermsVersion } from './screens/Terms'
import UseBiometry from './screens/UseBiometry'
import { loadLoginAttempt } from './services/keychain'
import { ConsoleLogger } from './services/logger'
import { AuthenticateStackParams, Screens } from './types/navigators'
import {
  Migration as MigrationState,
  Preferences as PreferencesState,
  State,
  Onboarding as StoreOnboardingState,
  Tours as ToursState,
} from './types/state'

export const defaultConfig = {
  PINSecurity: { rules: PINRules, displayHelper: false },
  settings: [],
  enableTours: false,
  supportedLanguages: ['en'],
  showPreface: false,
  disableOnboardingSkip: false,
  whereToUseWalletUrl: 'https://example.com',
  showScanHelp: true,
  showScanButton: true,
  showDetailsInfo: true,
}
export class MainContainer implements Container {
  public static readonly TOKENS = TOKENS
  private _container: DependencyContainer
  private log?: BaseLogger

  public constructor(container: DependencyContainer, log?: BaseLogger) {
    this._container = container
    this.log = log
  }

  public get container(): DependencyContainer {
    return this._container
  }

  public init(): Container {
    this.log?.info(`Initializing Bifold container`)

    this._container.registerInstance(TOKENS.SCREEN_PREFACE, Preface)
    this._container.registerInstance(TOKENS.SCREEN_DEVELOPER, Developer)
    this._container.registerInstance(TOKENS.SCREEN_TERMS, { screen: ScreenTerms, version: TermsVersion })
    this._container.registerInstance(TOKENS.SCREEN_SPLASH, Splash)
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING_PAGES, OnboardingPages)
    this._container.registerInstance(TOKENS.SCREEN_USE_BIOMETRY, UseBiometry)
    this._container.registerInstance(TOKENS.SCREEN_SCAN, Scan)
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING_ITEM, Onboarding)
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING, Onboarding)
    this._container.registerInstance(TOKENS.STACK_ONBOARDING, OnboardingStack)
    this._container.registerInstance(TOKENS.COMP_BUTTON, Button)
    this._container.registerInstance(TOKENS.GROUP_BY_REFERENT, false)
    this._container.registerInstance(TOKENS.CRED_HELP_ACTION_OVERRIDES, [])
    this._container.registerInstance(TOKENS.OBJECT_ONBOARDING_CONFIG, DefaultScreenOptionsDictionary)
    this._container.registerInstance(TOKENS.UTIL_LOGGER, new ConsoleLogger())
    this.container.registerInstance(TOKENS.UTIL_LEGACY_OCA_RESOLVER, new DefaultOCABundleResolver(bundle))
    this.container.registerInstance(TOKENS.UTIL_OCA_RESOLVER, new OverlayBundleResolver(bundle))
    this._container.registerInstance(TOKENS.UTIL_LEDGERS, defaultIndyLedgers)
    this._container.registerInstance(TOKENS.UTIL_PROOF_TEMPLATE, getProofRequestTemplates)
    this._container.registerInstance(TOKENS.UTIL_ATTESTATION_MONITOR, { useValue: undefined })
    this._container.registerInstance(TOKENS.NOTIFICATIONS, { useNotifications })
    this._container.registerInstance(TOKENS.CONFIG, defaultConfig)
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT, () => null)
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_OPTIONS, () => null)
    this._container.registerInstance(TOKENS.COMPONENT_HOME_HEADER, HomeHeaderView)
    this._container.registerInstance(TOKENS.COMPONENT_HOME_FOOTER, HomeFooterView)
    this._container.registerInstance(TOKENS.COMPONENT_CRED_EMPTY_LIST, EmptyList)
    this._container.registerInstance(TOKENS.COMPONENT_RECORD, Record)
    this._container.registerInstance(TOKENS.CACHE_CRED_DEFS, [])
    this._container.registerInstance(TOKENS.CACHE_SCHEMAS, [])
    this._container.registerInstance(
      TOKENS.FN_ONBOARDING_DONE,
      (dispatch: React.Dispatch<ReducerAction<unknown>>, navigation: StackNavigationProp<AuthenticateStackParams>) => {
        return () => {
          dispatch({
            type: DispatchAction.DID_COMPLETE_TUTORIAL,
          })

          navigation.navigate(Screens.Terms)
        }
      }
    )
    this._container.registerInstance(TOKENS.FN_LOAD_HISTORY, (agent: Agent<any>): IHistoryManager => {
      return new HistoryManager(agent)
    })
    this._container.registerInstance(TOKENS.LOAD_STATE, async (dispatch: React.Dispatch<ReducerAction<unknown>>) => {
      const loadState = async <Type>(key: LocalStorageKeys, updateVal: (newVal: Type) => void) => {
        const data = await AsyncStorage.getItem(key)
        if (data) {
          const dataAsJSON = JSON.parse(data) as Type
          updateVal(dataAsJSON)
        }
      }

      let loginAttempt = defaultState.loginAttempt
      let preferences = defaultState.preferences
      let migration = defaultState.migration
      let tours = defaultState.tours
      let onboarding = defaultState.onboarding

      await Promise.all([
        loadLoginAttempt().then((data) => {
          if (data) {
            loginAttempt = data
          }
        }),
        loadState<PreferencesState>(LocalStorageKeys.Preferences, (val) => (preferences = val)),
        loadState<MigrationState>(LocalStorageKeys.Migration, (val) => (migration = val)),
        loadState<ToursState>(LocalStorageKeys.Tours, (val) => (tours = val)),
        loadState<StoreOnboardingState>(LocalStorageKeys.Onboarding, (val) => (onboarding = val)),
      ])

      const state: State = {
        ...defaultState,
        loginAttempt: { ...defaultState.loginAttempt, ...loginAttempt },
        preferences: { ...defaultState.preferences, ...preferences },
        migration: { ...defaultState.migration, ...migration },
        tours: { ...defaultState.tours, ...tours },
        onboarding: { ...defaultState.onboarding, ...onboarding },
      }

      dispatch({ type: DispatchAction.STATE_DISPATCH, payload: [state] })
    })

    return this
  }

  public resolve<K extends keyof TokenMapping>(token: K): TokenMapping[K] {
    return this._container.resolve(token) as TokenMapping[K]
  }
  public resolveAll<K extends keyof TokenMapping, T extends K[]>(
    tokens: [...T]
  ): { [I in keyof T]: TokenMapping[T[I]] } {
    return tokens.map((key) => this.resolve(key)!) as { [I in keyof T]: TokenMapping[T[I]] }
  }
}

export const SystemContext = createContext<Container | undefined>(undefined)

export const SystemProvider = SystemContext.Provider

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useSystem = () => useContext(SystemContext)!
