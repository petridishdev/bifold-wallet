import hashCode from './hashCode'
import hashToRGBA from './hashToRGBA'

/**
 * Generate a color based on a seed string
 * @param seed The seed string.
 * @returns The generated color.
 */
const generateColor = (seed: string): string => {
  return hashToRGBA(hashCode(seed))
}

export default generateColor
