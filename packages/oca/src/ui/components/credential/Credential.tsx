import { contrastColor } from '@oca/utils'
import Logo from '@ui/components/card/Logo'
import Status, { StatusLevelEnum } from '@ui/components/card/Status'
import Watermark from '@ui/components/card/Watermark'
import Primary from '@ui/components/card/body/Primary'
import Secondary from '@ui/components/card/body/Secondary'
import Claim from '@ui/components/card/claim/Claim'
import {
  calculatePadding,
  calculateLogoWidth,
  calculateLogoHeight,
  calculatePrimaryWidth,
  calculatePrimaryHeight,
  calculateSecondaryWidth,
  calculateSecondaryHeight,
} from '@ui/components/card/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Issuer from '@ui/components/card/Issuer'
import Name from '@ui/components/card/Name'

const Credential: React.FC = () => {
  const { color, text } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()
  const { width: windowWidth } = useWindowDimensions()

  const padding = calculatePadding(windowWidth)
  const logoWidth = calculateLogoWidth(windowWidth)
  const logoHeight = calculateLogoHeight(windowWidth)
  const primaryWidth = calculatePrimaryWidth(windowWidth)
  const primaryHeight = calculatePrimaryHeight(windowWidth)
  const secondaryWidth = calculateSecondaryWidth(windowWidth)
  const secondaryHeight = calculateSecondaryHeight(windowWidth)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
    },
    logo: {
      width: logoWidth,
      height: logoHeight,
      position: 'absolute',
      top: padding,
      left: padding,
    },
    secondary: {
      width: secondaryWidth,
      height: secondaryHeight,
    },
    primary: {
      width: primaryWidth,
      height: primaryHeight,
    },
    primaryChild: {
      padding: padding,
      paddingLeft: 2 * padding,
      paddingRight: padding + logoWidth,
    },
    issuerText: {
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.white
      ),
    },
    nameText: {
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.white
      )
    },
    watermark: {
      width: windowWidth,
      height: windowWidth,
    },
    watermarkText: {
      fontSize: 0.05 * (windowWidth as number),
      opacity: 0.16,
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.lightGrey
      ),
    },
    status: {
      width: logoWidth,
      height: logoHeight,
      position: 'absolute',
      top: 0,
      right: 0,
    },
  })

  return (
    <View style={styles.container}>
      <Logo
        source={localizedCredential?.logo}
        label={localizedCredential?.name ?? localizedCredential?.issuer}
        style={styles.logo}
      />
      <Secondary style={styles.secondary} />
      <Primary style={styles.primary}>
        <View style={styles.primaryChild}>
          <Issuer
            issuer={localizedCredential?.issuer}
            textStyle={styles.issuerText}
          />
          <Name
            name={localizedCredential?.name}
            textStyle={styles.nameText}
          />
          {localizedCredential?.primaryAttribute && (
            <Claim attribute={localizedCredential?.primaryAttribute}></Claim>
          )}
          {localizedCredential?.secondaryAttribute && (
            <Claim attribute={localizedCredential?.secondaryAttribute}></Claim>
          )}
        </View>
      </Primary>
      {localizedCredential?.watermark && (
        <Watermark
          watermark={localizedCredential?.watermark}
          style={styles.watermark}
          textStyle={styles.watermarkText}
        />
      )}
      <Status
        level={StatusLevelEnum.ERROR}
        style={styles.status}
      />
    </View>
  )
}

export default Credential
