import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import { contrastColor } from '@oca/utils'
import Logo from '@ui/components/card/Logo'
import Status, { StatusLevelEnum } from '@ui/components/card/Status'
import Watermark from '@ui/components/card/Watermark'
import Primary from '@ui/components/card/body/Primary'
import Secondary from '@ui/components/card/body/Secondary'
import Claim from '@ui/components/card/claim/Claim'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'

const Credential: React.FC = () => {
  const { color, text } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()
  const { width: windowWidth } = useWindowDimensions()

  const paddingRatio = 0.05
  const primaryRatio = 0.88
  const secondaryRatio = 0.12
  const logoRatio = 0.12
  const heightRatio = 0.33

  const padding = paddingRatio * windowWidth
  const logoWidth = logoRatio * windowWidth
  const logoHeight = logoRatio * windowWidth
  const primaryWidth = primaryRatio * windowWidth
  const primaryHeight = heightRatio * windowWidth
  const secondaryWidth = secondaryRatio * windowWidth
  const secondaryHeight = heightRatio * windowWidth

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
    },
  })

  return (
    <View style={styles.container}>
      <Logo
        source={localizedCredential?.logo}
        label={localizedCredential?.name ?? localizedCredential?.issuer}
        style={{
          width: logoWidth,
          height: logoHeight,
          position: 'absolute',
          top: padding,
          left: padding,
        }}
      />
      <Secondary
        style={{
          width: secondaryWidth,
          height: secondaryHeight,
        }}
      />
      <Primary
        style={{
          width: primaryWidth,
          height: primaryHeight,
        }}
      >
        <View
          style={{
            padding: padding,
            paddingLeft: 2 * padding,
            paddingRight: padding + logoWidth,
          }}
        >
          <Text
            // testID={testIdWithKey('CredentialIssuer')}
            style={[
              text.labelBold,
              {
                lineHeight: 19,
                opacity: 0.8,
                color: contrastColor(
                  localizedCredential?.primaryBackgroundColor,
                  color.grayscale.darkGrey,
                  color.grayscale.white
                ),
              },
            ]}
          >
            {localizedCredential?.issuer}
          </Text>
          <Text
            // testID={testIdWithKey('CredentialName')}
            style={[
              text.bold,
              {
                lineHeight: 24,
                color: contrastColor(
                  localizedCredential?.primaryBackgroundColor,
                  color.grayscale.darkGrey,
                  color.grayscale.white
                ),
              },
            ]}
          >
            {localizedCredential?.name}
          </Text>
          {localizedCredential?.primaryAttribute && <Claim attribute={localizedCredential?.primaryAttribute}></Claim>}
          {localizedCredential?.secondaryAttribute && (
            <Claim attribute={localizedCredential?.secondaryAttribute}></Claim>
          )}
        </View>
      </Primary>
      {localizedCredential?.watermark && (
        <Watermark
          watermark={localizedCredential?.watermark}
          style={{
            width: windowWidth,
            height: windowWidth,
          }}
          textStyle={{
            fontSize: 0.05 * (windowWidth as number),
            opacity: 0.16,
            color: contrastColor(
              localizedCredential?.primaryBackgroundColor,
              color.grayscale.darkGrey,
              color.grayscale.lightGrey
            ),
          }}
        />
      )}
      <Status
        level={StatusLevelEnum.ERROR}
        style={{
          width: logoWidth,
          height: logoHeight,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
    </View>
  )
}

export default Credential
