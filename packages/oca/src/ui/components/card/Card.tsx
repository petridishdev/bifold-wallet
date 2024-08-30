import { View, useWindowDimensions } from 'react-native'

import { LocalizedCredential } from '@oca/formatters'
import Issuer from '@oca/ui/components/common/Issuer'
import Logo from '@oca/ui/components/common/Logo'
import Name from '@oca/ui/components/common/Name'
import Watermark from '@oca/ui/components/common/Watermark'
import { contrastColor, toImageSource } from '@oca/utils'
import Primary from '@ui/components/card/body/Primary'
import Secondary from '@ui/components/card/body/Secondary'
import Claim from '@ui/components/card/claim/Claim'
import Status, { StatusLevelEnum } from '@ui/components/card/Status'
import { createStyleSheet } from '@ui/components/card/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'

interface CardProps extends React.PropsWithChildren {
  connectionId?: string
  credentialId?: string
  status?: StatusLevelEnum
  credential?: LocalizedCredential
}

const Card: React.FC<CardProps> = ({ connectionId, credentialId, status, credential, children }) => {
  const { color } = useCredentialTheme()
  const { width: windowWidth } = useWindowDimensions()

  let styles = createStyleSheet(windowWidth)
  styles = {
    ...styles,
    container: {
      flexDirection: 'row',
      borderRadius: 10,
      ...styles.container,
    } as typeof styles.container,
    primary: {
      ...styles.primary,
      backgroundColor: credential?.primaryBackgroundColor,
    } as typeof styles.primary,
    secondary: {
      ...styles.secondary,
      backgroundColor: credential?.secondaryBackgroundColor ?? credential?.primaryBackgroundColor,
      zIndex: +!!(credential?.backgroundImageSlice ?? credential?.secondaryBackgroundColor),
    } as typeof styles.secondary,
    issuerText: {
      ...styles.issuerText,
      color: contrastColor(credential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white),
    } as typeof styles.issuerText,
    nameText: {
      ...styles.nameText,
      color: contrastColor(credential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white),
      fontWeight: 'bold',
    } as typeof styles.nameText,
    claimText: {
      ...styles.claimText,
      color: contrastColor(credential?.primaryBackgroundColor),
    } as typeof styles.claimText,
    watermarkText: {
      ...styles.watermarkText,
      color: contrastColor(credential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.lightGrey),
    } as typeof styles.watermarkText,
  }

  return (
    <View style={styles.container}>
      <Logo
        source={credential?.logo}
        label={credential?.name ?? credential?.issuer ?? credentialId ?? connectionId}
        style={styles.logo}
      />
      <Secondary
        source={toImageSource(credential?.backgroundImageSlice)}
        style={styles.secondary}
        tint={!(credential?.backgroundImageSlice || credential?.secondaryBackgroundColor)}
      />
      <Primary style={styles.primary}>
        <View style={styles.primaryChild}>
          <Issuer issuer={credential?.issuer ?? connectionId} textStyle={styles.issuerText} />
          <Name name={credential?.name ?? credentialId} textStyle={styles.nameText} />
          {children ?? (
            <>
              {credential?.primaryAttribute && (
                <Claim attribute={credential?.primaryAttribute} textStyle={styles.claimText} />
              )}
              {credential?.secondaryAttribute && (
                <Claim attribute={credential?.secondaryAttribute} textStyle={styles.claimText} />
              )}
            </>
          )}
        </View>
      </Primary>
      {credential?.watermark && (
        <Watermark watermark={credential?.watermark} style={styles.watermark} textStyle={styles.watermarkText} />
      )}
      {status && <Status level={status} style={styles.status} />}
    </View>
  )
}

export default Card
