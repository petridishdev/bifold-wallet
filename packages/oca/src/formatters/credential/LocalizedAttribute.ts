import { CredentialPreviewAttribute, CredentialPreviewAttributeOptions } from '@credo-ts/core'

import { IOverlayBundleAttribute as OverlayBundleAttributeOptions } from '../../interfaces/overlay'
import startCase from 'lodash.startcase'
import { CaptureBaseAttributeType } from '@oca/types'
import moment from 'moment'
import { OverlayStandard } from '@oca/types/TypeEnums'

export default class LocalizedAttribute extends CredentialPreviewAttribute {
  type: string | undefined
  characterEncoding: string | undefined
  standard: string | undefined
  format: string | undefined
  information: string | undefined
  label: string | undefined

  constructor(
    options: CredentialPreviewAttributeOptions,
    overlayOptions: OverlayBundleAttributeOptions,
    language: string,
  ) {
    super(options)

    this.type = overlayOptions.type
    this.characterEncoding = overlayOptions.characterEncoding
    this.standard = overlayOptions.standard
    this.format = overlayOptions.format
    this.information = overlayOptions.information?.[language]
    this.label = overlayOptions.label?.[language]
  }

  get formattedLabel(): string | undefined {
    return this.label ?? startCase(this.name)
  }

  get formattedValue(): string | undefined {
    switch (this.type) {
      case CaptureBaseAttributeType.DateTime:
      case CaptureBaseAttributeType.DateInt:
        if (this.standard === OverlayStandard.ISO1989) {
          const year = this.value.slice(0, 4)
          const month = this.value.slice(4, 6)
          const day = this.value.slice(6, 8)
          return moment(`${year}-${month}-${day}`).toISOString()
        } else {
          return moment(this.value).toISOString()
        }
      default:
        return this.value
    }
  }

  toJSON(): Record<string, unknown> {
    return { ...super.toJSON(), format: this.format, information: this.information, label: this.label }
  }
}
