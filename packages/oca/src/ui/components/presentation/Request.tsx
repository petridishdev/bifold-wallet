import { useCredentialTheme } from '@oca/ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@oca/ui/contexts/localizedCredential'
import { contrastColor } from '@oca/utils'
import Issuer from '@ui/components/card/Issuer'
import Logo from '@ui/components/card/Logo'
import Name from '@ui/components/card/Name'
import Primary from '@ui/components/card/body/Primary'
import Secondary from '@ui/components/card/body/Secondary'
import { createStyleSheet } from '@ui/components/card/utils'
import { FlatList, useWindowDimensions, View } from 'react-native'

import Watermark from '../card/Watermark'
import Claim from '../card/claim/Claim'

const Request: React.FC = () => {
  const { color } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()
  const { width: windowWidth } = useWindowDimensions()

  let styles = createStyleSheet(windowWidth)

  styles = {
    ...styles,
    primary: {
      ...styles.primary,
      backgroundColor: '#FFFFFF',
    } as typeof styles.primary,
    secondary: {
      ...styles.secondary,
      backgroundColor: localizedCredential?.primaryBackgroundColor,
    } as typeof styles.secondary,
    watermarkText: {
      ...styles.watermarkText,
      color: contrastColor(null, color.grayscale.mediumGrey),
    } as typeof styles.watermarkText,
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
          <Issuer issuer={localizedCredential?.issuer} textStyle={styles.issuerText} />
          <Name name={localizedCredential?.name} textStyle={styles.nameText} />
          <FlatList
            data={localizedCredential?.attributes ?? []}
            renderItem={({ item: attribute }) => {
              return <Claim attribute={attribute} />
            }}
          />
        </View>
      </Primary>
      {localizedCredential?.watermark && (
        <Watermark
          watermark={localizedCredential?.watermark}
          style={styles.watermark}
          textStyle={styles.watermarkText}
        />
      )}
    </View>
  )
}

export default Request
