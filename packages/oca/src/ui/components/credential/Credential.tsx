import { contrastColor } from '@oca/utils'
import Logo from '@ui/components/card/Logo'
import Status, { StatusLevelEnum } from '@ui/components/card/Status'
import Watermark from '@ui/components/card/Watermark'
import Primary from '@ui/components/card/body/Primary'
import Secondary from '@ui/components/card/body/Secondary'
import Claim from '@ui/components/card/claim/Claim'
import { createStyleSheet } from '@ui/components/card/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import { View, useWindowDimensions } from 'react-native'
import Issuer from '@ui/components/card/Issuer'
import Name from '@ui/components/card/Name'

const Credential: React.FC = () => {
  const { color } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()
  const { width: windowWidth } = useWindowDimensions()

  let styles = createStyleSheet(windowWidth)
  styles = {
    ...styles,
    issuerText: {
      ...styles.issuerText,
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.white
      )
    },
    nameText: {
      ...styles.nameText,
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.white
      )
    },
    watermarkText: {
      ...styles.watermarkText,
      color: contrastColor(
        localizedCredential?.primaryBackgroundColor,
        color.grayscale.darkGrey,
        color.grayscale.lightGrey
      ),
    }
  }

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
