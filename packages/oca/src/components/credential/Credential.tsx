import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { useCredentialTheme } from "../contexts/credentialTheme";
import { useLocalizedCredential } from "../contexts/localizedCredential";

import { contrastColor } from "../../utils";

import Secondary from "./body/Secondary";
import Logo from "./Logo";
import Primary from "./body/Primary";
import Status, { StatusLevelEnum } from "./Status";
import Watermark from "./Watermark";
import Claim from "./claim/Claim";


const Credential: React.FC = () => {
  const { color, text } = useCredentialTheme();
  const localizedCredential = useLocalizedCredential();
  const { width: windowWidth } = useWindowDimensions();

  const paddingRatio = 0.05;
  const primaryRatio = 0.88;
  const secondaryRatio = 0.12;
  const logoRatio = 0.12;
  const heightRatio = 0.33;

  const padding = paddingRatio * windowWidth;
  const logoWidth = logoRatio * windowWidth;
  const logoHeight = logoRatio * windowWidth;
  const primaryWidth = primaryRatio * windowWidth;
  const primaryHeight = heightRatio * windowWidth;
  const secondaryWidth = secondaryRatio * windowWidth;
  const secondaryHeight = heightRatio * windowWidth;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden'
    },
  });

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
          left: padding
        }}
      />
      <Secondary style={{
        width: secondaryWidth,
        height: secondaryHeight,
      }} />
      <Primary style={{
        width: primaryWidth,
        height: primaryHeight
      }}>
        <View style={{
          padding: padding,
          paddingLeft: 2 * padding,
          paddingRight: padding + logoWidth,
        }}>
          <Text
            // testID={testIdWithKey('CredentialIssuer')}
            style={[
              text.labelBold,
              {
                lineHeight: 19,
                opacity: 0.8,
                color: contrastColor(localizedCredential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white)
              }
            ]}>
            Issuer: Example Issuer
          </Text>
          <Text
            // testID={testIdWithKey('CredentialName')}
            style={[
              text.bold,
              {
                lineHeight: 24,
                color: contrastColor(localizedCredential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.white)
              }
            ]}>
            Name: Example Name
          </Text>
          {localizedCredential?.primaryAttribute && <Claim attribute={localizedCredential?.primaryAttribute}></Claim>}
          {localizedCredential?.secondaryAttribute && <Claim attribute={localizedCredential?.secondaryAttribute}></Claim>}
        </View>
      </Primary>
      {localizedCredential?.watermark && <Watermark
        watermark={localizedCredential?.watermark}
        style={{
          width: windowWidth,
          height: windowWidth,
        }}
        textStyle={{
          fontSize: 0.05 * (windowWidth as number),
          opacity: 0.16,
          color: contrastColor(localizedCredential?.primaryBackgroundColor, color.grayscale.darkGrey, color.grayscale.lightGrey)
        }} />}
      <Status level={StatusLevelEnum.ERROR} style={{
        width: logoWidth,
        height: logoHeight,
        position: 'absolute',
        top: 0,
        right: 0
      }} />
    </View>
  );
}

export default Credential;