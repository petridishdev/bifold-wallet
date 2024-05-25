import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useCredentialTheme } from '@ui/contexts/credentialTheme'

export enum StatusLevelEnum {
  WARNING = 'warning',
  ERROR = 'error',
}

export interface StatusProps extends React.PropsWithChildren {
  level?: StatusLevelEnum
  style?: StyleProp<ViewStyle>
}

const Status: React.FC<StatusProps> = ({ level = undefined, style }) => {
  const { color } = useCredentialTheme()

  const { width, height, position, top, right } = style as ViewStyle
  const borderRadius = 10

  const styles = StyleSheet.create({
    container: {
      width,
      height,
      position,
      top,
      right,
      borderTopRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
  })

  const renderStatus = (level?: StatusLevelEnum) => {
    switch (level) {
      case StatusLevelEnum.WARNING:
        return (
          <View
            style={[
              styles.container,
              {
                backgroundColor: color.notification.warn,
              },
            ]}
          >
            <Icon
              style={{
                color: color.semantic.warn,
              }}
              size={0.7 * (width as number)}
              name={level}
            />
          </View>
        )
      case StatusLevelEnum.ERROR:
        return (
          <View
            style={[
              styles.container,
              {
                backgroundColor: color.notification.error,
              },
            ]}
          >
            <Icon
              style={{
                color: color.semantic.error,
              }}
              size={0.7 * (width as number)}
              name={level}
            />
          </View>
        )
      default:
        return null
    }
  }

  return (
    <View
    // testID={testIdWithKey('CredentialCardStatus')}
    >
      {renderStatus(level)}
    </View>
  )
}

export default Status
