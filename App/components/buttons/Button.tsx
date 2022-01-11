import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { borderRadius, mainColor, red, shadow, textColor, transparent } from '../../globalStyles'
import Text from '../texts/Text'

interface Props {
  title: string
  accessibilityLabel?: string
  onPress?: () => void
  neutral?: true
  negative?: true
  outlined?: true
  disabled?: boolean
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    borderRadius,
    borderColor: mainColor,
    backgroundColor: mainColor,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  disabled: {
    borderColor: shadow,
    backgroundColor: shadow,
  },
  neutral: {
    borderColor: textColor,
    backgroundColor: textColor,
  },
  negative: {
    borderColor: red,
    backgroundColor: red,
  },
  outlined: {
    backgroundColor: transparent,
    padding: 8,
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    color: textColor,
  },
})

const Button: React.FC<Props> = ({ title, accessibilityLabel, onPress, disabled, neutral, negative, outlined }) => {
  const accessible = accessibilityLabel && accessibilityLabel !== '' ? true : false

  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.button,
        neutral && styles.neutral,
        negative && styles.negative,
        disabled && styles.disabled,
        outlined && styles.outlined,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, !(outlined || disabled) && neutral && { color: shadow }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
