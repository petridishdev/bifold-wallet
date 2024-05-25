import { LocalizedCredential } from '@oca/formatters'
import { createContext, useContext } from 'react'

export const LocalizedCredentialContext = createContext<LocalizedCredential | undefined>(undefined)

export const useLocalizedCredential = () => useContext(LocalizedCredentialContext)
