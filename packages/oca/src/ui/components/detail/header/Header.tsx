import { View, useWindowDimensions } from 'react-native'
import Primary from '@ui/components/detail/header/Primary'
import Secondary from '@ui/components/detail/header/Secondary'
import Issuer from '@ui/components/common/Issuer'
import Name from '@ui/components/common/Name'
import Watermark from '@ui/components/common/Watermark'
import { useCredentialTheme } from '@oca/ui/contexts'
import { createStyleSheet } from '@ui/components/detail/utils'
import { contrastColor, toImageSource } from '@oca/utils'
import { LocalizedCredential } from '@oca/formatters'
import Logo from '@ui/components/common/Logo'

interface DetailProps extends React.PropsWithChildren {
  connectionId?: string
  credentialId?: string
  credential?: LocalizedCredential
}

const Detail: React.FC<DetailProps> = ({ connectionId, credentialId, credential }) => {
  const { color } = useCredentialTheme()
  const { width: windowWidth } = useWindowDimensions()

  let styles = createStyleSheet(windowWidth)
  styles = {
    ...styles,
    primary: {
      ...styles.primary,
      backgroundColor: credential?.primaryBackgroundColor,
    } as typeof styles.primary,
    secondary: {
      ...styles.secondary,
      backgroundColor: credential?.secondaryBackgroundColor ?? credential?.primaryBackgroundColor,
      zIndex: +!!(credential?.backgroundImage ?? credential?.secondaryBackgroundColor),
    } as typeof styles.secondary,
    issuerText: {
      ...styles.issuerText,
      color: contrastColor(credential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white),
    } as typeof styles.issuerText,
    nameText: {
      ...styles.nameText,
      color: contrastColor(credential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white),
    } as typeof styles.nameText,
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
        source={toImageSource(credential?.backgroundImage)}
        style={styles.secondary}
        tint={!(credential?.backgroundImage || credential?.secondaryBackgroundColor)}
      />
      <Primary style={styles.primary}>
        <View style={styles.primaryChild}>
          {/* We keep a default single empty space so the styling remains consistent whether an 
            issuer and a name are present */}
          <Issuer issuer={credential?.issuer ?? connectionId ?? ' '} textStyle={styles.issuerText} />
          <Name name={credential?.name ?? credentialId} textStyle={styles.nameText} />
        </View>
      </Primary>
      {credential?.watermark && (
        <Watermark watermark={credential?.watermark} style={styles.watermark} textStyle={styles.watermarkText} />
      )}
    </View>
  )
}

export default Detail
