import { View, StyleSheet, Text, TextStyle, StyleProp, ViewStyle } from "react-native";

interface WatermarkProps extends React.PropsWithChildren {
  watermark: string
  textStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
}

const Watermark: React.FC<WatermarkProps> = ({ watermark = '', textStyle, style }) => {
  const { fontSize } = textStyle as TextStyle;
  const { width, height } = style as ViewStyle;

  const styles = StyleSheet.create({
    container: {
      width,
      height,
      position: 'absolute',
      top: -0.33 * (height as number),
      left: -0.05 * (width as number),
    },
    text: {
      opacity: 0.16,
      transform: [{ rotate: '-30deg' }],
      overflow: 'visible',
    },
  })
  

  const rows = [...Array(Math.ceil((height as number) / (fontSize as number) + 1)).keys()];
  const text = `${watermark} `.repeat(
    Math.ceil((width as number) / (Math.cos(30) * (((fontSize as number) / 2) * (watermark.length + 1))))
  );

  return (
    <View style={styles.container}>
      {rows.map(i => (
        <Text
          accessible={false}
          key={i}
          numberOfLines={1}
          style={[styles.text, { fontSize }, textStyle]}
        >
          {text}
        </Text>
      ))}
    </View>
  )
}

export default Watermark;