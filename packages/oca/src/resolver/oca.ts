import { defaultBundleLanguage } from '@oca/constants'
import { IBrandingOverlayData, IMetaOverlayData, IOverlayBundleData } from '@oca/interfaces'
import { OverlayBundle, OverlayType } from '@oca/types'
import { generateColor } from '@oca/utils'
import { parseCredDefFromId } from '@oca/utils/credential-definition'
import startCase from 'lodash.startcase'

export interface CredentialIdentifiers {
  schemaId?: string
  credentialDefinitionId?: string
  templateId?: string
}

export interface CredentialMetaData {
  credentialId?: string
  credentialAlias?: string
  connectionId?: string
  connectionAlias?: string
}

export interface OverlayBundleResolverOptions {
  language?: string
}

export interface OverlayBundleResolverType {
  resolveBundle(params: { identifiers: CredentialIdentifiers }): Promise<OverlayBundle | undefined>

  resolveDefaultBundle(params: {
    identifiers: CredentialIdentifiers
    metadata?: CredentialMetaData
    language?: string
  }): Promise<OverlayBundle | undefined>
}

export class BaseOverlayBundleResolver {
  private _log?: any

  /**
   * Get the log value.
   */
  get log() {
    return this._log
  }

  /**
   * Sets the log value.
   * @param value - The new value for the log.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set log(value: any) {
    this._log = value
  }
}

export class OverlayBundleResolver extends BaseOverlayBundleResolver implements OverlayBundleResolverType {
  protected bundles: Record<string, OverlayBundle | string> = {}

  constructor(bundles: Record<string, IOverlayBundleData | string> = {}) {
    super()
    for (const credentialDefinitionId in bundles) {
      const bundle = bundles[credentialDefinitionId]
      try {
        if (typeof bundle === 'string') {
          this.bundles[credentialDefinitionId] = bundle as string
        } else {
          this.bundles[credentialDefinitionId] = new OverlayBundle(credentialDefinitionId, bundle)
        }
      } catch (error) {
        this.log?.error(`Error parsing bundle for ${credentialDefinitionId}`, error)
      }
    }
  }

  private getDefaultBundle(params: {
    identifiers?: CredentialIdentifiers
    metadata?: CredentialMetaData
    language?: string
  }) {
    const { identifiers, metadata, language } = params

    const defaultMetaOverlay: IMetaOverlayData = {
      capture_base: '',
      type: OverlayType.Meta10,
      name:
        metadata?.credentialAlias ??
        startCase(
          metadata?.credentialId ?? parseCredDefFromId(identifiers?.credentialDefinitionId, identifiers?.schemaId),
        ),
      issuer: metadata?.connectionAlias || metadata?.connectionId || 'Unknown Contact',
      language: language ?? defaultBundleLanguage,
      description: '',
      credential_help_text: '',
      credential_support_url: '',
      issuer_description: '',
      issuer_url: '',
    }

    const colorHash = defaultMetaOverlay?.name ?? defaultMetaOverlay?.issuer ?? 'default'

    const defaultBrandingoOverlay: IBrandingOverlayData = {
      capture_base: '',
      type: OverlayType.Branding10,
      primary_background_color: generateColor(colorHash)
    }

    const bundle: OverlayBundle = new OverlayBundle(identifiers?.credentialDefinitionId as string, {
      capture_base: {
        attributes: {},
        classification: '',
        type: OverlayType.CaptureBase10,
        flagged_attributes: [],
      },
      overlays: [defaultMetaOverlay, defaultBrandingoOverlay],
    })

    return bundle
  }

  public resolveDefaultBundle(params: {
    identifiers: CredentialIdentifiers
    metadata?: CredentialMetaData
    language?: string
  }): Promise<OverlayBundle | undefined> {
    const bundle = this.getDefaultBundle(params)
    return Promise.resolve(bundle)
  }

  public resolveBundle(params: { identifiers: CredentialIdentifiers }): Promise<OverlayBundle | undefined> {
    const { identifiers } = params
    for (const identifier of [identifiers?.credentialDefinitionId, identifiers?.schemaId, identifiers?.templateId]) {
      if (identifier) {
        let bundle = this.bundles[identifier]
        // If it is a string, it is a reference/alias to another one bundle
        if (typeof bundle === 'string') {
          // Is this guaranteed to be a only one level deep?
          bundle = this.bundles[bundle]
        }
        return Promise.resolve(bundle as OverlayBundle)
      }
    }
    return Promise.resolve(undefined)
  }
}
