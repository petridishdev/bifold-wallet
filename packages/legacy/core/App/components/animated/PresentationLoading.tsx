import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

import ActivityIndicator from '../../assets/img/activity-indicator-circle.svg'
import ChatLoading from '../../assets/img/chat-loading.svg'
import { useTheme } from '../../contexts/theme'

const PresentationLoading: React.FC = () => {
  const { ColorPallet } = useTheme()
  const rotationAnim = useRef(new Animated.Value(0)).current
  const timing: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    animation: {
      position: 'absolute',
      zIndex: 1,
    },
  })
  const displayOptions = {
    fill: ColorPallet.notification.infoText,
  }
  const animatedCircleDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250,
  }

  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim, timing)).start()
  }, [rotationAnim])

  return (
    <View style={style.container}>
      <ChatLoading style={style.animation} {...displayOptions} />
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <ActivityIndicator {...animatedCircleDisplayOptions} />
      </Animated.View>
    </View>
  )
}

export default PresentationLoading
