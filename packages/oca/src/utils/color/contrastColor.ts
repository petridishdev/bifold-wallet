import luminance from './luminance'

interface Spectrum {
  black: string
  darkGrey: string
  mediumGrey: string
  lightGrey: string
  veryLightGrey: string
  white: string
}

/**
 * Returns the color that contrasts the most with the given color.
 * @param color The color to contrast.
 * @param shadeDark The color to return if the given color is light.
 * @param shadeLight The color to return if the given color is dark.
 * @param spectrum The color spectrum to use if the shades are not provided.
 * @returns The contrasting color. Defaults to black and white.
 */
export const contrastColor = (
  color: string = '',
  shadeDark?: string,
  shadeLight?: string,
  spectrum?: Spectrum,
): string => {
  const midpoint = 255 / 2
  if ((luminance(color) ?? 255) >= midpoint) {
    return shadeDark ?? spectrum?.darkGrey ?? spectrum?.black ?? '#000000'
  }
  return shadeLight ?? spectrum?.lightGrey ?? spectrum?.white ?? '#FFFFFF'
}

export default contrastColor
