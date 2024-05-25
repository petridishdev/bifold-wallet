import { createContext, useContext } from 'react'

import { LocalizedCredential } from '../../formatters/'

export const LocalizedCredentialContext = createContext<LocalizedCredential | undefined>(undefined)

export const useLocalizedCredential = () => useContext(LocalizedCredentialContext)
