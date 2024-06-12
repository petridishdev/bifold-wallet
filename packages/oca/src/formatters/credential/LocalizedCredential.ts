import { CredentialExchangeRecord } from '@credo-ts/core'

import { OverlayBundle } from '../../types'

import LocalizedAttribute from './LocalizedAttribute'

export default class LocalizedCredential {
  #bundle!: OverlayBundle

  attributes!: LocalizedAttribute[]
  issuer: string
  name: string
  watermark?: string

  constructor(bundle: OverlayBundle, record: CredentialExchangeRecord, language: string) {
    if (!language) {
      throw new Error('language is required')
    }

    this.#bundle = bundle

    this.issuer = bundle.metadata.issuer?.[language]
    this.name = bundle.metadata.name?.[language]
    this.watermark = bundle.metadata?.watermark?.[language]

    this.attributes = (record.credentialAttributes ?? []).map(
      (attribute) =>
        new LocalizedAttribute(
          attribute,
          bundle.getAttribute(attribute.name) ?? { name: attribute.name, type: '' },
          language,
        ),
    )
  }

  get primaryAttribute(): LocalizedAttribute | undefined {
    const name = this.#bundle.branding?.primaryAttribute
    return this.getAttribute(name)
  }

  get secondaryAttribute(): LocalizedAttribute | undefined {
    const name = this.#bundle.branding?.secondaryAttribute
    return this.getAttribute(name)
  }

  get logo(): string | undefined {
    return this.#bundle.branding?.logo
  }

  get primaryBackgroundColor(): string | undefined {
    return this.#bundle.branding?.primaryBackgroundColor
  }

  get secondaryBackgroundColor(): string | undefined {
    return this.#bundle.branding?.secondaryBackgroundColor
  }

  get backgroundImage(): string | undefined {
    return this.#bundle.branding?.backgroundImage
  }

  get backgroundImageSlice(): string | undefined {
    return this.#bundle.branding?.backgroundImageSlice
  }

  private getAttribute(attributeName?: string): LocalizedAttribute | undefined {
    if (!attributeName) {
      return undefined
    }
    return this.attributes.find((attribute) => attribute.name === attributeName)
  }
}
