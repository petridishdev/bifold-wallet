import { PADDING_RATIO, LOGO_RATIO, PRIMARY_RATIO, HEIGHT_RATIO, SECONDARY_RATIO } from './constants'

export const calculatePadding = (width: number): number => {
  return PADDING_RATIO * width
}

export const calculateLogoWidth = (width: number): number => {
  return LOGO_RATIO * width
}

export const calculateLogoHeight = (width: number): number => {
  return LOGO_RATIO * width
}

export const calculatePrimaryWidth = (width: number): number => {
  return PRIMARY_RATIO * width
}

export const calculatePrimaryHeight = (width: number): number => {
  return HEIGHT_RATIO * width
}

export const calculateSecondaryWidth = (width: number): number => {
  return SECONDARY_RATIO * width
}

export const calculateSecondaryHeight = (width: number): number => {
  return HEIGHT_RATIO * width
}
